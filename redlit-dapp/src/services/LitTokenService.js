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
