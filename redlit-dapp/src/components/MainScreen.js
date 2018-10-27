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


  componentDidMount() {
    this.timeout = setTimeout(this.update.bind(this), 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  goToProfile(){
    this.setView("Account");
  }

  goToRelations(){
    this.setView("Relation");
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
        <RequestsBadge setView={this.setView.bind(this)} services={this.props.services}/>
        <MainScreenView goToRelations={this.goToRelations.bind(this)} goToProfile={this.goToProfile.bind(this)} events={this.state.events} />
      </div>
    );
  }
}

MainScreen.propTypes = {
  services: PropTypes.object
};

export default MainScreen;
