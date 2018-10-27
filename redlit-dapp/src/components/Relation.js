import React, {Component} from 'react';
import RelationView from '../views/RelationView';

class Relation extends Component {
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
        <RelationView setView={this.setView.bind(this)}/>
      </div>
    );
  }
}

export default Relation;
