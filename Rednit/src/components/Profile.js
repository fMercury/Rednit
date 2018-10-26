import React, {Component} from 'react';
import ProfileView from '../views/ProfileView';

class Profile extends Component {
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
        <ProfileView setView={this.setView.bind(this)}/>
      </div>
    );
  }
}

export default Profile;
