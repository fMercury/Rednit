import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const RelationAccordionView = (props) => (
  <Collapsible
    title="Relation"
  >
    <p className="advice-text">
        Description of your relations.
    </p>

    <button onClick={() => props.setView('Relation')} className="btn fullwidth">
      Relation
    </button>
  </Collapsible>
);

RelationAccordionView.propTypes = {
  setView: PropTypes.func
};

export default RelationAccordionView;
