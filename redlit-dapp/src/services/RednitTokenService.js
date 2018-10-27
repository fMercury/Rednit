import ethers, {utils, Interface} from 'ethers';
import Token from '../../build/Token';
import {tokenContractAddress} from '../../config/config';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';
import RednitToken from '../../build/RednitToken';

class RednitTokenService {
  constructor(rednitTokenContractAddress, identityService, ensService, provider) {
    this.rednitTokenContractAddress = rednitTokenContractAddress;
    this.identityService = identityService;
    this.provider = provider;
  }

  async getBalance(address) {
    this.rednitTokenContract = new ethers.Contract(
      this.rednitTokenContractAddress,
      RednitToken.interface,
      this.provider
    );
    return await this.rednitTokenContract.balances(address);
  };

  async sendToRelation(address) {
    return await this.rednitTokenContract.balance(address);
  }

  async withdrawFromRelation(address) {
    return await this.rednitTokenContract.balance(address);
  }

  async sendRelationRequest(address) {
    return await this.rednitTokenContract.balance(address);
  }

  async acceptRelationRequest(address) {
    return await this.rednitTokenContract.balance(address);
  }

  async register() {
    const {data} = new Interface(RednitToken.interface).functions.register();
    const message = {
      to: this.rednitTokenContractAddress,
      from: this.identityService.identity.address,
      value: 0,
      data,
      gasToken: tokenContractAddress,
      ...DEFAULT_PAYMENT_OPTIONS
    }
    await this.identityService.execute(message);
  }
}

export default RednitTokenService;
