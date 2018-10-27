import React, {Component} from 'react';
import MainScreenView from '../views/MainScreenView';
import HeaderView from '../views/HeaderView';
import RequestsBadge from './RequestsBadge';
import AccountLink from './AccountLink';
import ProfileIdentity from './ProfileIdentity';
import PropTypes from 'prop-types';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    const {rednitTokenService} = this.props.services;
    this.rednitTokenService = rednitTokenService;
    this.state = {lastClick: '0', lastPresser: 'nobody', events: []};
  }

  setView(view) {
    const {emitter} = this.props.services;
    emitter.emit('setView', view);
  }

  async onClickerClick() {
    await this.rednitTokenService.register();
    this.setState({lastClick: '0'});
  }

  componentDidMount() {
    this.timeout = setTimeout(this.update.bind(this), 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  goToProfile(){
    this.setView("Account");
  }

  async update() {
    const {tokenService} = await this.props.services;
    const {identityService} = this.props.services;
    const {address} = identityService.identity; 
    const balance = await tokenService.getBalance(address); 
    const clicksLeft = parseInt(balance, 10); 
    this.setState({clicksLeft});  
    setTimeout(this.update.bind(this), 1000);
  }

  render() {
    return (
      <div>
        <MainScreenView goToProfile={this.goToProfile.bind(this)} clicksLeft={this.state.clicksLeft} events={this.state.events} onClickerClick={this.onClickerClick.bind(this)} lastClick={this.state.lastClick} />
      </div>
    );
  }
}

MainScreen.propTypes = {
  services: PropTypes.object
};

export default MainScreen;
