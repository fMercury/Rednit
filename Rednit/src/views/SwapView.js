import React, {Component} from 'react';
import PropTypes from 'prop-types';

const SwapView  = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Profile</h1>
          <p className="swap-text">
            Your Swap!!
          </p>

        </div>

      <div className="text-center">
        <button onClick={() => props.setView('Account')} className="secondary-btn">
          Back
        </button>
      </div>
    </div>
);


SwapView.propTypes = {
  setView: PropTypes.func
};

export default SwapView;
