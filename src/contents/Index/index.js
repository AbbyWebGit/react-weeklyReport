import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {
  Tabs,
  Table,
  Icon,
  Pagination,
  Button
} from 'antd';
import {getWeekly,delWeekly} from '../../api/api';
import {getCookie} from '../../utils/cookie';
import '../../index.css';
import './index.css';

const TabPane = Tabs.TabPane;

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      operations:<Button><Link to={{pathname:"/add"}}>添加</Link></Button>,
      pagenum:1,
      pageSize:10,
      totalnum:0,
      tabStatus:'all',   
      userID:getCookie('userid')||'',
      deleteStyle:{
        display:"none",
      },
      columns: [
        {
          title: '用户名',
          dataIndex: 'chinesename',
          key: 'userid'
        }, {
          title: '起止日期',
          dataIndex: 'startdate',
          key: 'startdate'
        }, {
          title: '终止日期',
          dataIndex: 'enddate',
          key: 'enddate',
          render: text=>text
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => (
              <div >
                <a href="" onClick={this.getDelete.bind(this,record._id.$oid)} style={this.state.deleteStyle}>删除</a>
                <span className="ant-divider" style={this.state.deleteStyle}/>
                <Link to={{pathname: "/detail/"+record._id.$oid}}>查看</Link>
                <span className="ant-divider" style={this.state.deleteStyle}/>
                <Link to={{pathname: "/editor/"+record._id.$oid}} style={this.state.deleteStyle}>编辑</Link>
              </div>
          )
         
        }
      ]
    }

  }

  componentDidMount() {
    this.getWeekly();
  }
  getWeekly(){
    const _this = this;
    var _data = {}
    _data.pagenum = this.state.pagenum || 1;
    _data.pagesize = this.state.pageSize || 10;
    if(this.state.tabStatus === 'me'){
      _data.userid = this.state.userID;
    }
    getWeekly(_data).then((res)=>{
      var _res = JSON.parse(res.data)
      console.log(_res);
      _this.setState({data: _res.mes.map((v,i)=>{
        return {...v,key:i}
      }),
      totalnum : _res.totalnum,
      // pagenum:_res.totalpage
    })
    })
    .catch(function (error) {
      console.log(error)
    });
  }
  // 删除
  getDelete(id,e) {
    e.preventDefault();
    delWeekly({
      _id:id,
     
    }).then((res)=>{
      // console.log(111)
      this.getWeekly();
    }).catch((error)=>{
      console.log(error)
    })
    
  }
  // 导航条
  handleTabChange = (key) => {
    switch (key){
      case 'me':
        this.setState({
          tabStatus:'me',
          pagenum:1,
          deleteStyle:{
            display:"inline-block",
          },

        },()=>{
          this.getWeekly()
        })
        break;
      default:
        this.setState({
          tabStatus:'',
          pagenum:1,
          deleteStyle:{
            display:"none",
          },
        },()=>{
          this.getWeekly()
        })
    }
  }
  handlePageChange = (page,pageSize) => {
    this.setState({
      pagenum:page
    },()=>{
      this.getWeekly()
    })
  }

  render() {

    return (
      <div>
        <Tabs defaultActiveKey="all"
          onChange={this.handleTabChange}
          tabBarExtraContent={this.state.operations}>
          <TabPane tab={<span><Icon type="appstore"/>全部周报</span>} key="all">
          </TabPane>
          <TabPane tab={<span><Icon type="user"/>我的周报</span>} key="me">
          </TabPane>
        </Tabs>
        <div className="table">
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={false}/>
          <div className="pagin">
            <Pagination current={this.state.pagenum} onChange={this.handlePageChange} total={this.state.totalnum}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Index