import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Tabs } from "antd";
import GoogleSignup from "./GoogleSignup.js";
import LoginWithEmail from "./LoginWithEmail.js";
import RegisterWithEmail from "./RegisterWithEmail.js";

const TabPane = Tabs.TabPane;

class LoginModal extends Component {
  state = {
    visible: false,
    currentUser: "",
    photoUrl: "",
    loggedIn: false,
    showLogin: true
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="openModal">
        <Button className="modalBtn" onClick={this.showModal}>
          Logga in
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="Registrera" key="1">
              <RegisterWithEmail />
            </TabPane>
            <TabPane tab="Logga in" key="2">
              <LoginWithEmail onLogin={this.props.onLogin} />
              <p className="or">eller</p>
              <GoogleSignup onLogin={this.props.onLogin} />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginModal;
