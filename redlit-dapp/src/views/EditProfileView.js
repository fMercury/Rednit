import React from 'react';
import PropTypes from 'prop-types';
import TextBox from './TextBox';

const EditProfileView = (props) => (
  <div className="subview">
    <div className="container">
      <h1 className="main-title">{props.identity}</h1>
      <form onSubmit={(event) => props.sendToIdentityService(event)}>
        <input label='upload new Picture' type='file' onChange={(event) => props.handleFileUpload(event)} />
        <TextBox className="edit-description-text" placeholder={props.description} />
        <button type='submit' className="btn fullwidth cancel-btn">Save</button>
      </form>
      <div className="text-center">
        <button onClick={() => props.setView('Account')} className="secondary-btn">
          Back
        </button>
      </div>
    </div>
  </div>
);


EditProfileView.propTypes = {
  setView: PropTypes.func,
  sendToIdentityService: PropTypes.func,
  handleFileUpload: PropTypes.func,
  identity: PropTypes.string,
  description: PropTypes.string
};

export default EditProfileView;
