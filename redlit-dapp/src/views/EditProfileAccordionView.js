import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const EditProfileAccordionView = (props) => (
  <Collapsible
    title="Profile"
  >
    <p className="advice-text">
        Edit the image and description of your profile.
    </p>
    <button onClick={() => props.setView('EditProfile')} className="btn fullwidth">
      Edit Profile
    </button>
  </Collapsible>
);

EditProfileAccordionView.propTypes = {
  setView: PropTypes.func
};

export default EditProfileAccordionView;
