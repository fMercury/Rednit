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

  async editProfile(name, description, file) {
    console.log("editing")
    const userProfile = {};
    userProfile.image = await image2base64(file);;
    userProfile.description = description;
    userProfile.name = name;
    const userProfleJSON = JSON.stringify(userProfile)
    console.log(userProfleJSON);
    await this.swarm.uploadRaw(userProfleJSON, async (err, profileHash) => {
      if (err) console.log(err)
      console.log(profileHash);
      await this.executeEditProfile(profileHash);
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
    var profileEdit = '';
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

    if (profileEdit !== '') { 
      console.log("getting swarm data");
      await this.swarm.downloadRaw(profileEdit, (err, content) => {
        if(err) return console.error(err);
        console.log(profileEdit);
        console.log(content);
        profileEdit = JSON.parse(content);
        console.log(`contents of our test: ${profileEdit}`);
      });
    }

    return profileEdit;
  }

  async getRegisteredUsers() {
    const registerUserEvent = new Interface(LitToken.interface).events.RegisterUser;
    var registeredUsers = [];
    const filter = {
      fromBlock: 0,
      address: this.litTokenContractAddress,
      topics: [registerUserEvent.topics]
    };
    const events = await this.provider.getLogs(filter);
    for (const event of events) {
      const eventArguments = registerUserEvent.parse(registerUserEvent.topics, event.data);
      registeredUsers.push(eventArguments.user);
    }
    return registeredUsers;
  }
}
export default LitTokenService;
