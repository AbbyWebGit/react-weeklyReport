import React, {Component} from 'react';
import {Layout} from 'antd';
import {Link} from 'react-router-dom'
import {
  Menu,
  Table,
  Icon,
  Pagination,
  Button,
  Input
} from 'antd';
import axios from 'axios';
import '../../index.css';
import './index.css';

const {Header, Footer, Content} = Layout;

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      columns: [
        {
          title: '用户名',
          dataIndex: 'userid',
          key: 'userid'
        }, {
          title: '起止日期',
          dataIndex: 'startdate',
          key: 'startdate'
        }, {
          title: '终止日期',
          dataIndex: 'enddate',
          key: 'enddate',
          render: text=>text+'hh'
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>

              <a
                href="#"
                onClick={this.getDelete.bind(this,record._id.$oid)}>删除</a>
              <span className="ant-divider"/>
              <a href={"/index?v="+record._id.$oid}>查看</a>
              <span className="ant-divider"/>
              <a href="#">编辑</a>

            </span>
          )
        }
      ]
    }

  }
  state = {
    current: 'app'
  }

  componentDidMount() {

    let _this = this
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    }

    axios({method: 'get', url: 'http://10.52.66.106:5678/weekly_reports'}).then(function (response) {
      var res = JSON.parse(response.data.data)
      // _this.data=res.mes
      console.log(res.mes[0]._id.$oid);
      _this.setState({data: res.mes.map((v,i)=>{
        return {...v,key:i}
      })})

    })
      .catch(function (error) {
        console.log(error)
      });

  }
  getMe(){
    console.log(1212)
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios({method: 'get', 
    url: 'http://10.52.66.106:5678/weekly_reports', 
    data: {
      userid:8,
      pagenum:1,
      pagesize:10

    }}).then(function (response) {
      console.log("chenggong")

    })
      .catch(function (error) {
        console.log(error)
      });
  }
  // 删除
  getDelete(id) {
    // console.info(record)
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios({method: 'delete', 
    url: 'http://10.52.66.106:5678/weekly_reports', 
    data: {
      _id:id
    }}).then(function (response) {
      console.log("chenggong")

    })
      .catch(function (error) {
        console.log(error)
      });
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({current: e.key});
  }

  render() {

    return (
      <div className="index">
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
              <div className='addBtn'>
                <Button type="primary">
                  <Link to={{
                    pathname: "/detail"
                  }}>
                    添加</Link>
                </Button>
              </div>

              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">
                <Menu.Item key="app">
                  <Icon type="appstore"/>全部周报
                </Menu.Item>
                <Menu.Item key="mail"   onClick={this.getMe.bind(this)}>
                  <Icon type="user"/>我的周报
                </Menu.Item>

              </Menu>

              <div className="table">
                <Table
                
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  pagination={false}/>
                <div className="pagin">
                  <Pagination defaultCurrent={1} total={500}/>
                </div>

              </div>

            </div>

          </Content>
          <Footer>京ICP备17016764号-1京网文【2017】2380-251 2017-2018 猎户星空版权所有</Footer>
        </Layout>
        {/* <Button type="primary">Button</Button> */}
      </div>
    );
  }
}

export default Index