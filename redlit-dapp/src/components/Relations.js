import React, {Component} from 'react';
import HeaderView from '../views/HeaderView';
import BackToAppBtn from './BackToAppBtn';
import RelationsView from '../views/RelationsView';
import PropTypes from 'prop-types';

class Relations extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
    this.litTokenService = this.props.services.litTokenService;
    this.state = {
      relations: []
    };
    this.getRelations();
    this.getRequests();
  }

  async getRelations(){
    var updatedRelations = [];
    let relations = await this.litTokenService.getRelationChannels();
    for (relation in relations) {
      var aRelation = {}
      aRelation.tokens = await this.litTokenService.getStake(relation.contract);
      aRelation.name = await this.litTokenService.getUserProfile(relation.lover).name;
      aRelation.address = relation.contract;
      updatedRelations.push(aRelation);
    }
    this.setState({ relations: updatedRelations });
  }

  async getRequests(){
    let requests = await this.litTokenService.getPendingRequests();
    this.setState({ requests: requests });
  }

  setView(view) {
    const {emitter} = this.props.services;
    emitter.emit('setView', view);
  }

  goToRelation() {
    this.setView("Relation");
  }

  render() {

    // const relations = [
    //   {name: "augusto", tokens: 50, address: "0x1234"},
    //   {name: "matias", tokens: 1, address: "0x1234"},
    //   {name: "franco", tokens: 1, address: "0x1234"},
    //   {name: "kyle", tokens: 60, address: "0x1234"},
    //   {name: "lili", tokens: 99, address: "0x1234"}
    // ];

    console.log(this.state);

    return (
      <div className="account">
        <HeaderView>
          <BackToAppBtn setView={this.setView.bind(this)} />
        </HeaderView>

        <div className="container">
          <RelationsView
          setView={this.setView.bind(this)}
          goToRelation={this.goToRelation.bind(this)}
          relations={this.state.relations}
          requests={this.state.requests}
        />
        </div>
      </div>
    );
  }
}
Relations.propTypes = {
  services: PropTypes.object
};

export default Relations;
