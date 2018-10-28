import React, {Component} from 'react';
import PropTypes from 'prop-types';


class RelationView extends Component {

  constructor(props) {
    super();
  }

  render() {
    const relation = this.props.relation;
    console.log(relation)
    return(
      <div className="container">
        <h1 className="main-title">Relation with {relation.name}</h1>
        <h2 className="main-title">{relation.name} Tokens: {relation.loverTokens}</h2>
        <h2 className="main-title">My Tokens: {relation.myTokens}</h2>
        <div>
          {
            relation.transactions.length ? relation.transactions.map((transaction, i) =>
              (<div key={i} className="row match-row" onClick={this.props.goToRelation}>
                <strong>{transaction.from}</strong> - {transaction.tokens} Tokens
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
