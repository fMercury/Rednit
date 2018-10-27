import React, {Component} from 'react';
import EditProfileView from '../views/EditProfileView';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.emitter = this.props.services.emitter;
    this.identityService = this.props.services.identityService;
    this.litTokenService = this.props.services.litTokenService;
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.sendToIdentityService = this.sendToIdentityService.bind(this);
    this.state = {
      file: this.litTokenService.getUserProfile()
    };
  }

  componentDidMount() {

  }

  setView(view) {
    this.emitter.emit('setView', view);
  }

  handleFileUpload(event) {
    event.preventDefault();
    this.setState({file: URL.createObjectURL(event.target.files[0])});
  }

  sendToIdentityService(event) {
    event.preventDefault();
    const {file} = this.state;
    this.litTokenService.editProfile(file);
  }

  render() {
    const {file} = this.state;
    return (
      <div>
        <EditProfileView setView={this.setView.bind(this)} sendToIdentityService={this.sendToIdentityService.bind(this)} handleFileUpload={this.handleFileUpload.bind(this)}/>
        { file ? <img src={file} /> : null }

      </div>
    );
  }
}

export default EditProfile;
