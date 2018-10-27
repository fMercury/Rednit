import React, {Component} from 'react';
import PropTypes from 'prop-types';

const RelationView  = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Matches</h1>
          <p className="relation-text">
            Your Matches!!
          </p>

        </div>

      <div className="text-center">
        <button onClick={() => props.setView('MainScreen')} className="secondary-btn">
          Back
        </button>
      </div>
    </div>
);


RelationView.propTypes = {
  setView: PropTypes.func
};

export default RelationView;
