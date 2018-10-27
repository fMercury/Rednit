import React, {Component} from 'react';
import SwapView from '../views/SwapView';

class Swap extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  render() {
    return (
      <div>
        <SwapView setView={this.setView.bind(this)}/>
      </div>
    );
  }
}

export default Swap;
