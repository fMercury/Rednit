import React, {Component} from 'react';
import HeaderView from '../views/HeaderView';
import BackToAppBtn from './BackToAppBtn';
import RelationsView from '../views/RelationsView';
import PropTypes from 'prop-types';

class Relations extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
  }

  setView(view) {
    const {emitter} = this.props.services;
    emitter.emit('setView', view);
  }

  goToRelation() {
    this.setView("Relation");
  }

  render() {

    const relations = [
      {name: "augusto", tokens: 50, address: "0x1234"},
      {name: "matias", tokens: 1, address: "0x1234"},
      {name: "franco", tokens: 1, address: "0x1234"},
      {name: "kyle", tokens: 60, address: "0x1234"},
      {name: "lili", tokens: 99, address: "0x1234"}
    ];

    return (
      <div className="account">
        <HeaderView>
          <BackToAppBtn setView={this.setView.bind(this)} />
        </HeaderView>

        <div className="container">
          <RelationsView setView={this.setView.bind(this)} goToRelation={this.goToRelation.bind(this)} relations={relations} />
        </div>
      </div>
    );
  }
}
Relations.propTypes = {
  services: PropTypes.object
};

export default Relations;
