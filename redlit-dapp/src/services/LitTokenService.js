import ethers, {utils, Interface} from 'ethers';
import Token from '../../build/Token';
import {tokenContractAddress} from '../../config/config';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';
import LitToken from '../../build/LitToken';
import RelationChannel from '../../build/RelationChannel';
import image2base64 from 'image-to-base64';
import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

class LitTokenService {
  constructor(litTokenContractAddress, identityService, ensService, provider) {
    this.litTokenContractAddress = litTokenContractAddress;
    this.identityService = identityService;
    this.provider = provider;
  }

  async getBalance(address) {
    this.litTokenContract = new ethers.Contract(
      this.litTokenContractAddress,
      LitToken.interface,
      this.provider
    );
    return utils.formatEther(await this.litTokenContract.balanceOf(address));
  };

  async getStake(relationAddress, userAddress=this.identityService.identity.address) {
    relationContract = new ethers.Contract(
      relationAddress,
      RelationChannel.interface,
      this.provider
    );
    let loverOne = await relationContract.lover_one;
    if (userAddress === loverOne) {
      return await relationContract.lover_one_balance;
    } else {
      return await relationContract.lover_two_balance;
    }
  };

  async sendToRelation(address) {
    return await this.litTokenContract.balance(address);
  }

  async withdrawFromRelation(address) {
    return await this.litTokenContract.balance(address);
  }

  async sendRelationRequest(toAddress, numTokens) {
    const {data} = new Interface(LitToken.interface).functions.submitRequest(toAddress, numTokens);
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

  async acceptRelationRequest(fromAddress, numTokens) {
    const {data} = new Interface(LitToken.interface).functions.acceptRequest(fromAddress, numTokens);
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

  async senderCancelRequest(toAddress) {
    const {data} = new Interface(LitToken.interface).functions.cancelRequestSender(toAddress);
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

  async receiverCancelRequest(fromAddress) {
    const {data} = new Interface(LitToken.interface).functions.cancelRequestReceiver(fromAddress);
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

  async editProfile(oldProfile, {name, description, file}) {
    const userProfile = {};
    userProfile.image =  file && !! file.length ? await image2base64(file) : oldProfile.image
    userProfile.description = description || oldProfile.description;
    userProfile.name = name || oldProfile.name;
    const buffer = new Buffer(JSON.stringify(userProfile));
    await ipfs.add(buffer, async (err, profileHash) => {
      if (err) return console.log(err);
      console.log(profileHash[0].hash);
      await this.executeEditProfile(profileHash[0].hash);
    })
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

  async getRelationChannels(userAddress=this.identityService.identity.address) {
    const relationChannelCreatedEvent = new Interface(LitToken.interface).events.RelationChannelCreated;
    var relations = [];
    const filter = {
      fromBlock: 0,
      address: this.litTokenContractAddress,
      topics: [relationChannelCreatedEvent.topics]
    };
    const events = await this.provider.getLogs(filter);
    for (const event of events) {
      const eventArguments = relationChannelCreatedEvent.parse(relationChannelCreatedEvent.topics, event.data);
      if (eventArguments.personA === userAddress || eventArguments.personB === userAddress) {
        var relation = {};
        if (eventArguments.personA === userAddress) {
          relation.lover = eventArguments.personB;
        } else {
          relation.lover = eventArguments.personA;
        }
        relation.contract = eventArguments.relationChannel;
        relations.push(relation);
      }
    }

    return relations;
  }

  async getPendingRequests(userAddress=this.identityService.identity.address) {
    const connectionRequestEvent = new Interface(LitToken.interface).events.ConnectionRequest;
    var pendingRequests = [];
    const filter = {
      fromBlock: 0,
      address: this.litTokenContractAddress,
      topics: [connectionRequestEvent.topics]
    };
    const events = await this.provider.getLogs(filter);
    for (const event of events) {
      console.log(event);
      const eventArguments = connectionRequestEvent.parse(connectionRequestEvent.topics, event.data);
      if (userAddress === eventArguments.receiver) {
        this.litTokenContract = new ethers.Contract(
          this.litTokenContractAddress,
          LitToken.interface,
          this.provider
        );
        let numTokens = await relationContract.request[eventArguments.sender][userAddress];
        if (numTokens > 0) {
          var aPendingRequest = {};
          aPendingRequest.sender = eventArguments.sender;
          aPendingRequest.receiver = eventArguments.receiver;
          aPendingRequest.tokens = eventArguments.tokens;
          pendingRequests.push(aPendingRequest);
        }
      }
    }
    return pendingRequests;
  }

  async getUserProfile(userAddress=this.identityService.identity.address) {
    const profileEditEvent = new Interface(LitToken.interface).events.ProfileEdit;
    var profileEdit = {};
    var profileHash = '';
    const filter = {
      fromBlock: 0,
      address: this.litTokenContractAddress,
      topics: [profileEditEvent.topics]
    };
    const events = await this.provider.getLogs(filter);
    for (const event of events) {
      const eventArguments = profileEditEvent.parse(profileEditEvent.topics, event.data);
      if (eventArguments.user === userAddress) {
        profileHash = eventArguments.profileHash;
      }
    }

    if (profileHash) {
      let content = await ipfs.cat(profileHash).catch(err => console.log(err));
      profileEdit = JSON.parse(content.toString('utf8'));
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

  async submitRequest(to, tokens) {
    console.log(to, utils.parseEther("1"));
    const {data} = new Interface(LitToken.interface).functions.submitRequest(to, utils.parseEther("1"));
    const message = {
      to: this.litTokenContractAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    };
    console.log('send tx');
    const tx = await this.identityService.execute(message);
    console.log(tx);
  }
}
export default LitTokenService;
