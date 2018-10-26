import React from 'react';
import Collapsible from '../components/Collapsible';
import PropTypes from 'prop-types';

const LogoutAccordionView = (props) => (
  <Collapsible
    title="Logout"
  >
    <p className="advice-text">
      By logging out, you are removing this device from your identity.
    </p>
    <button onClick={() => props.logout()} className="btn fullwidth">
      Logout
    </button>
  </Collapsible>
);

LogoutAccordionView.propTypes = {
  logout: PropTypes.func
};

export default LogoutAccordionView;
