import React, {Component} from 'react';
import EditProfileView from '../views/EditProfileView';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
    this.identityService = this.props.services.identityService;
    this.litTokenService = this.props.services.litTokenService;
    this.state = {
      file: [], 
      description: '',
      name: '' 
    };
  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  handleFileUpload(event) {
    event.preventDefault();
    this.setState({file: URL.createObjectURL(event.target.files[0])});
  }

  editDescription(event) {
    const description = event.target.value;
    this.setState({description: description});
  }

  editName(event) {
    const name = event.target.value;
    this.setState({name: name});
  }

  async submitEdits(event) {
    event.preventDefault();
    await this.litTokenService.editProfile(this.state.name, this.state.description, this.state.file);
    this.emitter.emit('setView', 'MainScreen');
  }

  render() {
    const {file} = this.state;
    return (
      <div>
        <EditProfileView 
          setView={this.setView.bind(this)} 
          submitEdits={this.submitEdits.bind(this)} 
          handleFileUpload={this.handleFileUpload.bind(this)}
          identity={this.identityService.identity.name}
          editDescription={this.editDescription.bind(this)}
          editName={this.editName.bind(this)}
          description="Howdy Do Test Description!"
          name="Francisco Testname"
        />

      </div>
    );
  }
}

export default EditProfile;
