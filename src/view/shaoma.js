import React from 'react';
import {ScrollView, Text, View, DeviceEventEmitter, Image} from 'react-native';
import {Tabs, List, Card, WingBlank, Toast} from '@ant-design/react-native';
import Topbar from '../component/topbar';
const Item = List.Item;
const Brief = Item.Brief;
export default class BasicTabsExample extends React.Component {
  static navigationOptions = {
    title: '扫码',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return <Image source={require('../images/saoma1_active.png')} />;
      } else {
        return <Image source={require('../images/saoma1.png')} />;
      }
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        code: '',
        gsname: '',
        goodsType: '',
        trademark: '',
        address: '',
      },
    };
  }
  async componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
      'UPDATE_USER_DATA',
      () => {
        console.log(this.props.navigation.state.params.code);
        if (this.props.navigation.state.params.code) {
          fetch(
            `http://tools.scroll.govsz.com/api/scroll?code=${
              this.props.navigation.state.params.code
            }`,
          )
            .then(Response => {
              console.log(Response);
              return Response.json();
            })
            .then(res => {
              console.log(res.showapi_res_body);
              if (res.showapi_res_body === '后端服务维护中,请稍后') {
                Toast.offline('数据未获取到，请重新扫码');
              } else {
                let resdata = res.showapi_res_body;
                this.setState({
                  data: {
                    name: resdata.goodsName,
                    code: resdata.code,
                    gsname: resdata.manuName,
                    goodsType: resdata.goodsType,
                    trademark: resdata.trademark,
                    address: resdata.manuAddress,
                  },
                });
              }
            });
        }
      },
    );
  }
  async componentWillUnmount() {
    this.subscription.remove();
  }
  render() {
    const tabs = [
      {title: '商户信息'},
      {title: '检测风险'},
      {title: '溯源风险'},
      {title: '评价指数'},
    ];
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
    };
    return (
      <View style={{flex: 1}}>
        <Topbar props={this.props} />
        <Tabs
          tabs={tabs}
          prerenderingSiblingsNumber={0}
          destroyInactiveTab={true}
          onChange={() => {
            // alert(1);
          }}>
          <View
            style={{justifyContent: 'center', alignItems: 'center'}}
            key="1">
            <WingBlank size="lg" style={{width: '100%', borderColor: '#fff'}}>
              <Card style={{borderColor: '#fff', border: 0}}>
                <Card.Header
                  title="商品信息"
                  thumbStyle={{width: 30, height: 30}}
                />
                <Card.Body>
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>商品名称</Text>
                    <Text style={{marginLeft: 16}}>{this.state.data.name}</Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>条形码</Text>
                    <Text style={{marginLeft: 16}}>{this.state.data.code}</Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>公司名</Text>
                    <Text style={{marginLeft: 16}}>
                      {this.state.data.gsname}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>公司地址</Text>
                    <Text style={{marginLeft: 16}}>
                      {this.state.data.address}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>分类</Text>
                    <Text style={{marginLeft: 16, marginRight: 100}}>
                      {this.state.data.goodsType}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                  <View
                    style={{
                      height: 42,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{marginLeft: 16, width: 60}}>商标</Text>
                    <Text style={{marginLeft: 16}}>
                      {this.state.data.trademark}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      width: '100%',
                      opacity: 0.2,
                    }}
                  />
                </Card.Body>
                <Card.Footer style={{border: 0}} content="" extra="" />
              </Card>
            </WingBlank>
          </View>
          <View style={style} key="2">
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: '#f5f5f9',
                width: '100%',
              }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <List renderHeader={'检测信息'}>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
                <Item
                  wrap
                  multipleLine
                  extra={
                    <View>
                      农药残留
                      <Brief style={{textAlign: 'right'}}>2019-03-08</Brief>
                      <Brief style={{textAlign: 'right'}}>
                        丽水市食品研究院
                      </Brief>
                    </View>
                  }>
                  甘蓝
                </Item>
              </List>
            </ScrollView>
          </View>
          <View style={style} key="3">
            <Text>溯源风险</Text>
          </View>
          <View style={style} key="4">
            <Text>评价指数</Text>
          </View>
        </Tabs>
      </View>
    );
  }
}
export const title = 'Tabs';
export const description = 'Tabs example';
