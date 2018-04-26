import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';

import {Link} from 'react-router-dom'
import {addWeekly,getWeekly,editWeekly} from '../../api/api'
import {getCookie} from '../../utils/cookie';
import '../../index.css';
import './detail.css';
const FormItem = Form.Item;
const {TextArea} = Input;
// const {WeekPicker } = DatePicker;

class Detail extends Component {
  //构造函数
  constructor(props) {
    super(props)
    var _status = '';
    switch(this.props.match.path){
      case '/editor/:id':
        _status = "edit";
        this.getWeeklyDetail(this.props.match.params.id)
        break;
      case '/detail/:id':
        _status = "detail";
        this.getWeeklyDetail(this.props.match.params.id)
        break;
      case '/add':
       _status = "add"
        break;
      default:
        console.log('default');
    }

    this.state = {
      confirmDirty: false,
      pageStatus:_status,
    }
  }

  getWeeklyDetail = (id) => {
    getWeekly({
      _id : id
    }).then((res)=>{
      var _res = JSON.parse(res.data)
      //console.log(res);
      //console.log(this.props.form)
      var setFieldsValue = this.props.form.setFieldsValue;
      setFieldsValue({
        startdate:moment(_res.startdate),
        enddate:moment(_res.enddate),
        content:_res.content,
      })
      
    })
  }
  setWeeklyDetail = (params) => {
    editWeekly(params).then((res) => {
      console.log(res);
    })
    console.log("bianji")
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      //console.log(values)
      
      if (!err) {
        values.startdate = values.startdate.format('YYYY/MM/DD')
        values.enddate = values.enddate.format('YYYY/MM/DD')
        values.userid = getCookie('userid');
        values.chinesename= getCookie('chinesename');
        //console.log(values)
       
        if(this.state.pageStatus === 'edit'){
          values._id = this.props.match.params.id
          console.log(111);
          editWeekly(values).then((res) => {
            if(res.status === 200){
              _this.props.history.push('/index')
             }
          })
        }else{
          addWeekly(values).then((res)=>{
            console.log(values)
            if(res.status === 200){
              _this.props.history.push('/index')
             }
          })

        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    moment.locale('zh-cn');
    let benTemp = ''
    if(this.state.pageStatus !== 'detail'){
      benTemp = <FormItem {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit" onClick={this.submit} >提交</Button>
      <Button><Link to={{pathname: "/index"}}>返回</Link></Button>
    </FormItem>
    }else{
      benTemp = <FormItem {...tailFormItemLayout}>
    
      <Button><Link to={{pathname: "/index"}}>返回</Link></Button>
    </FormItem>
    }

    return (
      <div className='mesWarp'>
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="开始时间">
          {getFieldDecorator('startdate', {
            rules: [{ required: true, message: '请输入周报开始时间' }],
          })(
            // <WeekPicker placeholder="Select Week" />
            <DatePicker disabled={this.state.pageStatus === 'detail'} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="结束时间">
          {getFieldDecorator('enddate', {
            rules: [{ required: true, message: '请输入周报结束时间' }],
          })(
            <DatePicker disabled={this.state.pageStatus === 'detail'} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="周报内容">
          {getFieldDecorator('content', {
            rules: [ {
              required: true, message: '请输入周报',
            }],
          })(
            <TextArea rows={10}  disabled={this.state.pageStatus === 'detail'}/>
          )}
        </FormItem>
        {benTemp}
      </Form>
      </div>
    );
  }
}

export default Form.create()(Detail)