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
import RelationView from '../views/RelationView';
import PropTypes from 'prop-types';

class Relation extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  render() {
    return (
      <div className="account">
        <HeaderView>
          <BackToAppBtn setView={this.setView.bind(this)} />
        </HeaderView>

        <div className="container">
          <RelationView setView={this.setView.bind(this)} />
        </div>
      </div>
    );
  }
}
Relation.propTypes = {
  services: PropTypes.object
};

export default Relation;
