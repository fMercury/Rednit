import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ProfileView  = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Profile</h1>
          <p className="profile-text">
            Your Profile!!
          </p>

        </div>

      <div className="text-center">
        <button onClick={() => props.setView('Account')} className="secondary-btn">
          Back
        </button>
      </div>
    </div>
);


ProfileView.propTypes = {
  setView: PropTypes.func
};

export default ProfileView;
