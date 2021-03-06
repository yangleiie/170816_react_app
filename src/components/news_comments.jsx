import React from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import {Card, Form, Input, Button, Row, Col, message, notification, BackTop} from 'antd';

const FormItem = Form.Item;

class NewsComments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: []
    }
  }
  // 组件将要接收props数据或者接收的props数据发生变化的时候调用的钩子函数
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${nextProps.newsId}`;
    axios.get(url)
      .then(response => {
        let data = response.data;
        console.log(data);
        // 更新状态
        this.setState({comments: data});
      })
  }
  // 定义提交评论的方法
  handleSubmit = (event) => {
    // 阻止默认行为
    event.preventDefault();
    // 准备工作
    let userId = JSON.parse(localStorage.getItem('person_key') || '{}').userId;
    // 判断用户是否登录
    if(!userId){
      message.warn('请先登录');
      setTimeout(() => {
          PubSub.publish('isShow', true)
      }, 1000)
      return;
    }
    let newsId = this.props.newsId;
    let comment = this.props.form.getFieldValue('comment');
    let url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`;
    axios.get(url)
      .then(response => {
        let data = response.data;
        message.success('恭喜您，提交评论成功');
        // 清空表单相的输入的内容
        this.props.form.resetFields();
      })
  };
  // 定义收藏文章的方法
  handleCollection = () => {
    // 准备工作
    let userId = JSON.parse(localStorage.getItem('person_key') || '{}').userId;
    // 判断用户是否登录
    if(!userId){
      message.warn('请先登录')
      return;
    }
    let newsId = this.props.newsId;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        notification.success({
          description: '收藏文章成功',
          message: 'ReactNews'
        })
      })
  }
  render() {
    let {comments} = this.state;
    let {getFieldDecorator}  = this.props.form;
    let commentsList = comments.length?
      (
        comments.map((item, index) => {
          return (
            <li key={index}>
              <Card title={item.UserName} extra={item.datetime}>
                {item.Comments}
              </Card>
            </li>
          )
        })
      )
      :'暂时没有评论内容'
    return (
      <div>
        <ul>
          {commentsList}
        </ul>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='您的评论' labelCol={{span: 2, offset: 11}}>
            {
              getFieldDecorator('comment')(<Input.TextArea type="textarea"/>)
            }
          </FormItem>
          <Row>
            <Col span={5} push={9}>
              <Button htmlType='submit' type="primary">提交评论</Button>&nbsp;
              <Button onClick={this.handleCollection} type="primary">收藏文章</Button>
            </Col>
          </Row>
        </Form>
          <BackTop visibilityHeight={1500}/>
      </div>
    )
  }
}

export default Form.create()(NewsComments);
// this.props.form