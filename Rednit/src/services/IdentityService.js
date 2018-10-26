import ethers, {Wallet} from 'ethers';

class IdentityService {
  constructor(sdk, emitter, storageService, provider) {
    this.sdk = sdk;
    this.emitter = emitter;
    this.identity = {};
    this.deviceAddress = '';
    this.provider = provider;
    this.storageService = storageService;
  }

  async loadIdentity() {
    const identity = await this.storageService.getIdentity();
    if (identity) {
      this.identity = identity;
      this.emitter.emit('setView', 'MainScreen');
    }
  }

  async logout() {
    await this.storageService.clearStorage();
  }

  async connect(label) {
    this.privateKey = await this.sdk.connect(
      this.identity.address,
      label
    );
    const {address} = new Wallet(this.privateKey);
    this.subscription = this.sdk.subscribe(
      'KeyAdded',
      this.identity.address,
      (event) => {
        if (event.address === address) {
          this.cancelSubscription();
          this.identity = {
            name: this.identity.name,
            privateKey: this.privateKey,
            address: this.identity.address
          };
          this.emitter.emit('setView', 'Greeting', {greetMode: 'addKey'});
          this.storeIdentity(this.identdity);
        }
      }
    );
  }

  async storeIdentity(identity) {
    this.storageService.storeIdentity(identity);
  }

  async recover() {
    this.privateKey = await ethers.Wallet.createRandom().privateKey;
    const {address} = new Wallet(this.privateKey, this.provider);
    this.deviceAddress = address;
    this.subscription = this.sdk.subscribe(
      'KeyAdded',
      this.identity.address,
      (event) => {
        if (event.address === address) {
          this.cancelSubscription();
          this.identity = {
            name: this.identity.name,
            privateKey: this.privateKey,
            address: this.identity.address
          };
          this.emitter.emit('setView', 'Greeting');
          this.storeIdentity(this.identdity);
        }
      }
    );
  }

  cancelSubscription() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  async createIdentity(name) {
    this.emitter.emit('creatingIdentity', {name});
    const [privateKey, address] = await this.sdk.create(name);
    this.identity = {
      name,
      privateKey,
      address
    };
    this.emitter.emit('identityCreated', this.identity);
    this.storeIdentity(this.identity);
  }

  async execute(message) {
    await this.sdk.execute(
      this.identity.address,
      message,
      this.identity.privateKey
    );
  }

  async identityExist(identity) {
    const identityAddress = await this.sdk.identityExist(identity);
    if (identityAddress) {
      this.identity = {name: identity, address: identityAddress};
      return true;
    }
  }
}

export default IdentityService;
