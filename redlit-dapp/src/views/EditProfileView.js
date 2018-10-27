import React from 'react';
import PropTypes from 'prop-types';

const EditProfileView = (props) => (
  <div className="subview">
    <div className="container">
      <h1 className="main-title">Edit Profile</h1>
      <p className="backup-text">
        Edit your profile!
      </p>
    </div>
    <form onSubmit={(event) => props.sendToIdentityService(event)}>
      <input label='upload new Picture' type='file' onChange={(event) => props.handleFileUpload(event)} />
      <button type='submit' className="btn">Swarm it!</button>
    </form>
    <div className="text-center">
      <button onClick={() => props.setView('Account')} className="secondary-btn">
        Back
      </button>
    </div>
  </div>
);


EditProfileView.propTypes = {
  setView: PropTypes.func,
  sendToIdentityService: PropTypes.func,
  handleFileUpload: PropTypes.func
};

export default EditProfileView;
