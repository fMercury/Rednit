import React, {Component} from 'react';
import HeaderView from '../views/HeaderView';
import BackToAppBtn from './BackToAppBtn';
import ProfileIdentity from './ProfileIdentity';
import BackupCodeAccordionView from '../views/BackupCodeAccordionView';
import LogoutAccordionView from '../views/LogoutAccordionView';
import SettingsAccordion from './SettingsAccordion';
import PropTypes from 'prop-types';

class Account extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
    console.log(props)
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  async logout() {
    //this.props.identityService.removeKey()
    this.props.identityService.logout();
    this.emitter.emit('setView', 'Login');
  }

  render() {
    return (
      <div className="account">
        <HeaderView>
          <BackToAppBtn setView={this.setView.bind(this)} />
        </HeaderView>

        <div className="container">
          <ProfileIdentity
            type="identityAccount"
            identityService={this.props.identityService}
          />
          <hr className="separator" />
          <BackupCodeAccordionView setView={this.setView.bind(this)} />
          <hr className="separator" />
          <LogoutAccordionView logout={this.logout.bind(this)} />
          <hr className="separator" />
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  services: PropTypes.object
};

export default Account;
