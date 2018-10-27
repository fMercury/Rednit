import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SwapView  = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Profile</h1>
          <p className="swap-text">
            Your Swap!!
          </p>
        </div>

        <div>
          <img src={require('../img/user.svg')} height="158px" width="480px"/>
        </div>
        <div>
          <img src={require('../img/CrossMark.png')} height="150px" width="150px" circle />
          <img src={require('../img/CheckMark.png')} height="150px" width="150px" circle />
        </div>
      <div>
          <Slider />
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
