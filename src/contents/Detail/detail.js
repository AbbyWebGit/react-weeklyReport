import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,


} from 'antd';
import {Layout} from 'antd';
import '../../index.css';
import './detail.css';
import {Link} from 'react-router-dom'
const {Header, Footer, Content} = Layout;
const FormItem = Form.Item;
const {TextArea} = Input;
// const Option = Select.Option;

// const AutoCompleteOption = AutoComplete.Option;

// const residences = [{
//   value: 'zhejiang',
//   label: 'Zhejiang',
//   children: [{
//     value: 'hangzhou',
//     label: 'Hangzhou',
//     children: [{
//       value: 'xihu',
//       label: 'West Lake',
//     }],
//   }],
// }, {
//   value: 'jiangsu',
//   label: 'Jiangsu',
//   children: [{
//     value: 'nanjing',
//     label: 'Nanjing',
//     children: [{
//       value: 'zhonghuamen',
//       label: 'Zhong Hua Men',
//     }],
//   }],
// }];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
   

    return (
      <Form onSubmit={this.handleSubmit}>
        
       
        <FormItem
          {...formItemLayout}
          label="开始时间"
        >
          {getFieldDecorator('start', {
            rules: [{ required: true, message: '请输入周报开始时间' }],
          })(
            <DatePicker />
          )}
        </FormItem>
       
       
        <FormItem
        {...formItemLayout}
        label="结束时间">

          {getFieldDecorator('end', {
            rules: [{ required: true, message: '请输入周报结束时间' }],
          })(
            <DatePicker />
          )}
        </FormItem>
      

        <FormItem
          {...formItemLayout}
          label="周报内容"
        >
          {getFieldDecorator('content', {
            rules: [ {
              required: true, message: '请输入周报',
            }],
          })(
            <TextArea rows={10} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" ><Link to={{pathname: "/index"}}> 提交</Link></Button>
          <Button>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);










class User extends Component {

  render() {

    return (
      <div className="detail">
        <Layout>

          <Header className='clearfix'>
            <span className='logo'></span>
            <div className='loginMes'>
              <span className="loginName">张静</span>
              <span className='exit'>退出</span>
            </div>

          </Header>
          <Content>
            <div className='contentWarp'>
            <div className='mesWarp'>
            <WrappedRegistrationForm />
            </div>

            </div>

          </Content>
          <Footer>京ICP备17016764号-1京网文【2017】2380-251 2017-2018 猎户星空版权所有</Footer>
        </Layout>

      </div>
    );
  }
}

export default User