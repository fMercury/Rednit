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
    this.litTokenService = this.props.services.litTokenService;
    this.ensService = this.props.services.ensService;
    this.identityService = this.props.services.identityService;
    this.state = {events: [], profile: [], ensName: '', address: '', isLoading: true, noProfiles: false};
    this.getProfile();
  }

  async getProfile(){
    this.setState({ isLoading:true })
    var profiles = await this.litTokenService.getRegisteredUsers();
    profiles = profiles.filter(addr => addr != this.identityService.identity.address);
    var profile = {
      name: "",
      description: "",
      image: "default"
    }
    if (profiles.length > 0){
      const rand = Math.floor(Math.random() * profiles.length);
      const ensName = await this.ensService.getEnsName(profiles[rand]);
      var profile = await this.litTokenService.getUserProfile(profiles[rand]);
    }
    console.log(profiles.length == 0)
    this.setState({
      ensName: profile.ensName,
      profile: profile,
      isLoading: false,
      tokenAmount: 1,
      noProfiles: profiles.length == 0
    });
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

  goToRelations() {
    this.setView("Relations");
  }

  goToRelation() {
    this.setView("Relation");
  }

  async rejectProfile() {
    this.getProfile();
  }

  async sendLit() {
    const {tokenAmount, address} = this.state;
    console.log(`sending ${tokenAmount} Lit to ${address}`);
    await this.litTokenService.sendLit(address, tokenAmount);
    this.getProfile();
  }

  async handleSlideChange(event) {
    this.setState({tokenAmount: event.target.value});
  }

  async update() {
    // const {tokenService} = await this.props.services;
    // const {identityService} = this.props.services;
    // const {address} = identityService.identity;
    // setTimeout(this.update.bind(this), 1000);
  }

  render() {
    return (
      <div>
        <RequestsBadge setView={this.setView.bind(this)} services={this.props.services}/>
        <MainScreenView
          isLoading={this.state.isLoading}
          noProfiles={this.state.noProfiles}
          name={this.state.profile.name}
          image={this.state.profile.image}
          description={this.state.profile.description}
          rejectProfile={this.rejectProfile.bind(this)}
          goToRelations={this.goToRelations.bind(this)}
          goToProfile={this.goToProfile.bind(this)}
          events={this.state.events}
          sendLit={this.sendLit.bind(this)}
          handleSlideChange={this.handleSlideChange.bind(this)}
          tokenAmount={this.state.tokenAmount}
        />
      </div>
      )
  }
}

MainScreen.propTypes = {
  services: PropTypes.object
};

export default MainScreen;
