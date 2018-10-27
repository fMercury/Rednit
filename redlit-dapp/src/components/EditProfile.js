import React, {Component} from 'react';
import EditProfileView from '../views/EditProfileView';

class EditProfile extends Component {
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
        <EditProfileView setView={this.setView.bind(this)}/>
      </div>
    );
  }
}

export default EditProfile;
