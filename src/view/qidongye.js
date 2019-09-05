/**
 *
 * 启动页
 *
 */
import React, {Component} from 'react';
import {Image, StatusBar, View} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
    };
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          animated={false}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'light-content'}
        />
        <Image
          source={require('../images/qidong.png')}
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        />
      </View>
    );
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.timer = setTimeout(() => {
      global.storage
        .load({
          key: 'user',
        })
        .then(res => {
          console.log(res);
          if (res) {
            NavigationUtil.reset(navigation, 'Home');
          } else {
            NavigationUtil.reset(navigation, 'LoginScreen');
          }
        })
        .catch(err => {
          console.log(err);
          NavigationUtil.reset(navigation, 'LoginScreen');
          console.warn(err.message);
        });
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}
