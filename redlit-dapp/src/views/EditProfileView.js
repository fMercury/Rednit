import React, {Component} from 'react';
import PropTypes from 'prop-types';

const EditProfileView = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Edit Profile</h1>
          <p className="backup-text">
            Edit your profile!
          </p>
        </div>
        <div className="text-center">
          <button onClick={() => props.setView('Account')} className="secondary-btn">
            Back
          </button>
        </div>
      </div>
);


EditProfileView.propTypes = {
  setView: PropTypes.func
};

export default EditProfileView;
