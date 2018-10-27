import ethers, {Wallet} from 'ethers';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';
import SwarmAPI from 'swarm-api';
import image2base64 from 'image-to-base64';

class IdentityService {
  constructor(sdk, emitter, storageService, provider, swarmProvider) {
    this.sdk = sdk;
    this.emitter = emitter;
    this.identity = {};
    this.deviceAddress = '';
    this.provider = provider;
    this.storageService = storageService;
    this.swarmProvider = swarmProvider;
    // this.swarm = Swarm.at(this.swarmProvider);
    this.swarm = new SwarmAPI({ gateway: this.swarmProvider });
  }

  async loadIdentity() {
    const identity = await this.storageService.getIdentity();
    if (identity) {
      this.identity = identity;
      this.emitter.emit('setView', 'MainScreen');
    }
  }

  async storeIdentity(identity) {
    this.storageService.storeIdentity(identity);
  }

  async getUserProfile(address=this.identity.address) {
    return this.sdk.getProfileEdit(address);
  }

  async editProfile(file) {
    const base64File = await image2base64(file);
    let profileHash = '';
    this.swarm.uploadRaw(base64File, async (err, swarmImageHash) => {
      if(err) return console.error('Error uploading contents', err);
      let userProfile = this.getUserProfile();
      userProfile.image = swarmImageHash;
      this.swarm.uploadRaw(userProfile, async (err, profileHash) => {
        console.log('calling with');
        console.log('this.identity.address', this.identity.address);
        console.log('profileHash', profileHash);
        console.log('this.identity.privateKey', this.identity.privateKey);
        console.log('DEFAULT_PAYMENT_OPTIONS', DEFAULT_PAYMENT_OPTIONS);
        await this.sdk.editProfile(this.identity.address, profileHash, this.identity.privateKey, DEFAULT_PAYMENT_OPTIONS);
      });
    });
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
          this.emitter.emit('setView', 'MainScreen');
          this.storeIdentity(this.identdity);
        }
      }
    );
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
          this.emitter.emit('setView', 'MainScreen');
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
