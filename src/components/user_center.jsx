import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Row, Col, Tabs, Card, Icon, Modal, Upload} from 'antd';

const TabPane = Tabs.TabPane;


class UserCenter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentsList: null,
      collectionList: null,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }
  }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })


  componentWillMount(){
    // 准备工作
    let userId = JSON.parse(localStorage.getItem('person_key')).userId;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    // 发送请求获取用户的评论列表
    axios.get(url)
        .then(response => {
          let data = response.data;
          this.setState({
            commentsList: data
          });
        })
    // 发送请求获取用户的收藏列表
    url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url)
        .then(response => {
          let data = response.data;
          this.setState({
            collectionList: data
          });
        })
  }
  render(){
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
          <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
          </div>
      );


    let {commentsList, collectionList} = this.state;
    let comments = commentsList?
        (
            commentsList.map((item, index) => {
              return (
                  <li key={index}>
                    <Card title={`于 ${item.datetime}评论了${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                      {item.Comments}
                    </Card>
                  </li>
              )
            })
        )
        :'暂时没有评论内容';

    let collections = collectionList?
        (
            collectionList.map((item, index) => {
              return (
                  <li key={index}>
                    <Card title={item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                      {item.Title}
                    </Card>
                  </li>
              )
            })
        )
        :'暂时没有收藏任何文章';
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <TabPane tab="我的评论" key="1">
                <ul>
                  {comments}
                </ul>
              </TabPane>
              <TabPane tab="我的收藏" key="2">
                <ul>
                  {collections}
                </ul>
              </TabPane>
              <TabPane tab="上传图片" key="3">
                  <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      multiple
                  >
                      {uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default UserCenter;