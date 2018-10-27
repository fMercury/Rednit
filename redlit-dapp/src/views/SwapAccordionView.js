import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const SwapAccordionView = (props) => (
  <Collapsible
    title="Swap"
  >
    <p className="advice-text">
        Swaps.
    </p>

    <button onClick={() => props.setView('Swap')} className="btn fullwidth">
      Swap
    </button>
  </Collapsible>
);

SwapAccordionView.propTypes = {
  setView: PropTypes.func
};

export default SwapAccordionView;
