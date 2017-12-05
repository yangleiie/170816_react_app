import React from 'react';
import {Link} from 'react-router';
import {
  Row,Col, Menu, Icon, Button, Modal
} from 'antd'

import logo from '../images/logo.png';

const MenuItem = Menu.Item;

class NewsHeader extends React.Component {
  constructor(props) {
    super(props);
    // 初始化数据
    this.state = {
      key: 'toutiao',
      username: null,
      userId: null,
      isShow: false
    }
  }
  // 定义点击MenuItem时的回调函数
  changeKey = ({ key }) => {
    // console.log(item, key,keyPath);
    // 判断点击的是否是登录注册的按钮
    if(key === 'loginAndRegister'){
      // 修改isShow的状态
      this.setState({isShow: true});
    }
    // 修改状态
    this.setState({key});
  };

  // 定义隐藏对话框的方法
  // handleShow = () => {
  //   // 修改isShow的状态
  //   this.setState({
  //     isShow: false
  //   })
  // };
  handleShow = (isShow) => {
    this.setState({isShow});
  };
  render () {
    let {key, username, userId, isShow} = this.state;
    let UserItem = username?
    ( // 用户登录
      <MenuItem className="register" key="userCenter">
        <Button type="primary">{username}</Button>&nbsp;
        <Button type="dashed"><Link to="/user_center">个人中心</Link></Button>&nbsp;
        <Button>退出</Button>
      </MenuItem>
    )
    :( // 未登录
      <MenuItem className="register" key="loginAndRegister">
        <Icon type="appstore"/> 登录/注册
      </MenuItem>
    )

    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <div className="logo">
              <img src={logo} alt=""/>
              <span>ReactNews</span>
            </div>
          </Col>
          <Col span={19}>
            <Menu onClick={this.changeKey} mode="horizontal" selectedKeys={[key]}>
              <MenuItem key="toutiao">
                <Icon type="appstore"/> 头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/> 社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {UserItem}
            </Menu>
            <Modal title="用户中心" visible={isShow} okText="确定"
                   onOk={this.handleShow.bind(this, false)} onCancel={this.handleShow.bind(this, false)}></Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}


export default NewsHeader;