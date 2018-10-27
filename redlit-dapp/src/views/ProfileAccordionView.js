import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const ProfileAccordionView = (props) => (
  <Collapsible
    title="Profile"
  >
    <p className="advice-text">
        Image and description of your profile.
    </p>

    <button onClick={() => props.setView('Profile')} className="btn fullwidth">
      Profile
    </button>
  </Collapsible>
);

ProfileAccordionView.propTypes = {
  setView: PropTypes.func
};

export default ProfileAccordionView;
