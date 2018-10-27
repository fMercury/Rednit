import ethers, {utils, Interface} from 'ethers';
import Token from '../../build/Token';
import {tokenContractAddress} from '../../config/config';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';
import LitToken from '../../build/LitToken';

class LitTokenService {
  constructor(litTokenAddress, identityService, ensService, provider) {
    this.litTokenAddress = litTokenAddress;
    this.identityService = identityService;
    this.provider = provider;
  }

  async getBalance(address) {
    this.litTokenContract = new ethers.Contract(
      this.litTokenAddress,
      LitToken.interface,
      this.provider
    );
    return await this.litTokenContract.balances(address);
  };

  async sendToRelation(address, tokens) {
    const {data} = new Interface(LitToken.interface).functions.sendToRelation(address, tokens);
    const message = {
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

  async withdrawFromRelation(address, tokens) {
    const {data} = new Interface(LitToken.interface).functions.withdrawFromRelation(address, tokens);
    const message = {
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

  async sendRelationRequest(to, tokens) {
    const {data} = new Interface(LitToken.interface).functions.submitRequest(to, tokens);
    const message = {
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

  async cancelRequestReceiver(to) {
    const {data} = new Interface(LitToken.interface).functions.cancelRequestReceiver(to);
    const message = {
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

  async cancelRequestSender(from) {
    const {data} = new Interface(LitToken.interface).functions.cancelRequestSender(from);
    const message = {
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

  async acceptRequest(to, tokens) {
    const {data} = new Interface(LitToken.interface).functions.acceptRelationRequest(to, tokens);
    const message = {
      to: this.litTokenAddress,
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
      to: this.litTokenAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }

}

export default LitTokenService;
