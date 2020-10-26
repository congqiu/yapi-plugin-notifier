import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Switch, Button, Input, Radio, Tooltip, Icon } from "antd";
const FormItem = Form.Item;

// layout
const formItemLayout = {
  labelCol: {
    lg: { span: 5 },
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    lg: { span: 16 },
    xs: { span: 24 },
    sm: { span: 12 }
  },
  className: "form-item"
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 11
    }
  }
};

@Form.create()
export default class Add extends Component {
  static propTypes = {
    form: PropTypes.object,
    notifier: PropTypes.object,
    onSubmit: PropTypes.func,
    handleNameInput: PropTypes.func,
    notifierNames: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      notifier_data: props.notifier
    };
  }

  handleSubmit = async () => {
    const { form, notifier, onSubmit } = this.props;
    let params = {
      id: notifier._id,
      project_id: notifier.project_id,
      open: this.state.notifier_data.open,
      hook: this.state.notifier_data.hook
    };
    form.validateFields(async (err, values) => {
      if (!err) {
        let assignValue = Object.assign(params, values);
        onSubmit(assignValue);
      }
    });
  };

  // 是否开启
  onChange = v => {
    let notifier_data = this.state.notifier_data;
    notifier_data.open = v;
    this.setState({
      notifier_data: notifier_data
    });
  }

  onTypeChange = v => {
    let notifier_data = this.state.notifier_data;
    notifier_data.type = v;
    this.setState({
      notifier_data: notifier_data
    });
  }

  render() {
    const { notifierNames } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="m-panel">
        <Form>
          <FormItem
            label="是否开启通知"
            {...formItemLayout}
          >
            <Switch
              checked={this.state.notifier_data.open}
              onChange={this.onChange}
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </FormItem>

          <div>
            <FormItem {...formItemLayout} label="通知名称">
              {getFieldDecorator("notifier_name", {
                rules: [
                  {
                    required: true,
                    message: "请输入通知名称"
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (value) {
                        if (notifierNames.includes(value)) {
                          callback("通知名称重复");
                        } else if (!/\S/.test(value)) {
                          callback("请输入通知名称");
                        } else {
                          callback();
                        }
                      } else {
                        callback();
                      }
                    }
                  }
                ],
                validateTrigger: "onBlur",
                initialValue: this.state.notifier_data.notifier_name
              })(<Input onChange={e => this.props.handleNameInput(e.target.value)} />)}
            </FormItem>

            <FormItem {...formItemLayout}
              label={
                <span>
                  通知类型
                </span>
              }>
              {getFieldDecorator("type", {
                rules: [
                  {
                    required: true,
                    message: "请输入通知地址"
                  }
                ],
                validateTrigger: "onBlur",
                initialValue: this.state.notifier_data.type
              })(
                <Radio.Group onChange={this.onTypeChange}>
                  <Radio value={"ww"}>企业微信</Radio>
                  <Radio value={"dingtalk"}>钉钉</Radio>
                  <Radio value={"webhook"}>webhook</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout}
              label={
                <span>
                  通知地址
                </span>
              }>
              {getFieldDecorator("hook", {
                rules: [
                  {
                    required: true,
                    message: "请输入通知地址"
                  }
                ],
                validateTrigger: "onBlur",
                initialValue: this.state.notifier_data.hook
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout}
              label={
                <span>
                  通知签名&nbsp;
                  <Tooltip title="配置后消息形式为：【签名】消息内容">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }>
              {getFieldDecorator("signature", {
                initialValue: this.state.notifier_data.signature
              })(<Input />)}
            </FormItem>
          </div>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" icon="save" size="large" onClick={this.handleSubmit}>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
