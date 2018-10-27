import React, {Component} from 'react';
import HeaderView from '../views/HeaderView';
import BackToAppBtn from './BackToAppBtn';
import ProfileIdentity from './ProfileIdentity';
import BackupCodeAccordionView from '../views/BackupCodeAccordionView';
import LogoutAccordionView from '../views/LogoutAccordionView';
import EditProfileAccordionView from '../views/EditProfileAccordionView';
import ProfileAccordionView from '../views/ProfileAccordionView';
import RelationAccordionView from '../views/RelationAccordionView';
import SwapAccordionView from '../views/SwapAccordionView';
import SettingsAccordion from './SettingsAccordion';
import PropTypes from 'prop-types';

class Account extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  async logout() {
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
          <EditProfileAccordionView setView={this.setView.bind(this)} />

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
