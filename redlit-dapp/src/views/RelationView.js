import React, {Component} from 'react';
import PropTypes from 'prop-types';

const RelationView  = (props) => (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">Relation wow</h1>
          <p className="relation-text">
            Your Relation!
          </p>

        </div>

    </div>
);


RelationView.propTypes = {
  setView: PropTypes.func
};

export default RelationView;
