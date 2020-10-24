import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Form, Icon, Button, Input, message, Tooltip } from "antd";
// import axios from 'axios';

export default class NotifierView extends Component {
  static propTypes = {
    form: PropTypes.object,
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  async componentDidMount() {
    // const projectId = this.props.projectId;
  }

  render() {
    return (
      <div className="m-panel">
        机器人
      </div>
    );
  }
}
