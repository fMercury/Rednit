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
    return await this.litTokenContract.balances(address);
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
    return await this.litTokenContract.submitRequest(toAddress, numTokens);
  }

  async acceptRelationRequest(fromAddress, numTokens) {
    return await this.litTokenContract.acceptRequest(fromAddress, numTokens);
  }

  async senderCancelRequest(toAddress) {
    return await this.litTokenContract.cancelRequestSender(toAddress);
  }

  async receiverCancelRequest(fromAddress) {
    return await this.litTokenContract.cancelRequestReceiver(fromAddress);
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
      let content = await ipfs.cat(profileEdit).catch(err => console.log(err));
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

  async sendLit(to, tokens) {
    console.log(to, tokens);
    const {data} = new Interface(LitToken.interface).functions.submitRequest('0xc88Be04c809856B75E3DfE19eB4dCf0a3B15317a', tokens);
    const message = {
      to: this.litTokenContractAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    };
    console.log('send tx');
    const tx = await this.identityService.execute(message).catch(console.log);
    console.log(tx);
  }
}
export default LitTokenService;
