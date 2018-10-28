import React, {Component} from 'react';
import PropTypes from 'prop-types';


class RelationView extends Component {

  constructor(props) {
    super();

  }

  render() {
    console.log(this.props.relations);
    return(
      <div className="container">
        <h1 className="relations-title">Matches</h1>
        <div>
          {
            this.props.relations.length ? this.props.relations.map((relation, i) =>
              (<div key={i} className="row match-row" onClick={this.props.goToRelation}>
                <strong>{relation.name}</strong> - {relation.tokens} Tokens
              </div>)) : '-'
          }
        </div>
        <h1 className="relations-title">Requests</h1>
        <div>
          {
            this.props.relations.length ? this.props.relations.map((relation, i) =>
              (<div key={i} className="row match-row" onClick={this.props.goToRelation}>
                <strong>{relation.name}</strong> - {relation.tokens} Tokens
                <a className="request-button">Accept</a><a className="request-button"> Cancel</a>
              </div>)) : '-'
          }
        </div>
      </div>
    );
  }
};


RelationView.propTypes = {
  setView: PropTypes.func
};

export default RelationView;
