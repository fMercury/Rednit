import ethers, {utils, Interface} from 'ethers';
import Token from '../../build/Token';
import {tokenContractAddress} from '../../config/config';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';
import LitToken from '../../build/LitToken';
import SwarmAPI from 'swarm-api';
import image2base64 from 'image-to-base64';

class LitTokenService {
  constructor(litTokenContractAddress, identityService, ensService, provider, swarmProvider) {
    this.litTokenContractAddress = litTokenContractAddress;
    this.identityService = identityService;
    this.provider = provider;
    this.swarmProvider = swarmProvider;
    this.swarm = new SwarmAPI({ gateway: this.swarmProvider });
  }

  async getBalance(address) {
    this.litTokenContract = new ethers.Contract(
      this.litTokenContractAddress,
      LitToken.interface,
      this.provider
    );
    return await this.litTokenContract.balances(address);
  };

  async sendToRelation(address) {
    return await this.litTokenContract.balance(address);
  }

  async withdrawFromRelation(address) {
    return await this.litTokenContract.balance(address);
  }

  async sendRelationRequest(address) {
    return await this.litTokenContract.balance(address);
  }

  async acceptRelationRequest(address) {
    return await this.litTokenContract.balance(address);
  }

  async register() {
    const {data} = new Interface(LitToken.interface).functions.register();
    const message = {
      to: this.litTokenContractAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
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
        console.log('this.identity.address', this.identityService.identity.address);
        console.log('profileHash', profileHash);
        console.log('this.identity.privateKey', this.identityService.identity.privateKey);
        console.log('DEFAULT_PAYMENT_OPTIONS', DEFAULT_PAYMENT_OPTIONS);
        await this.executeEditProfile(profileHash);
        console.log("Success");
      });
    });
  }

  async executeEditProfile(profileHash) {
    const {data} = new Interface(LitToken.interface).functions.editProfile(profileHash);
    const message = {
      to: this.litTokenContractAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }


  async getUserProfile(userAddress=this.identityService.identity.address) {
    const profileEditEvent = new Interface(LitToken.interface).events.ProfileEdit;
    var profileEdit = [];
    const filter = {
      fromBlock: 0,
      address: this.litTokenContractAddress,
      topics: [profileEditEvent.topics]
    };
    const events = await this.provider.getLogs(filter);
    for (const event of events) {
      const eventArguments = profileEditEvent.parse(profileEditEvent.topics, event.data);
      if (eventArguments.user === userAddress) {
        profileEdit = eventArguments.profileHash;
      }
    }
    return profileEdit;
  }
}
export default LitTokenService;
