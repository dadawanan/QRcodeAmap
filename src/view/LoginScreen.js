import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {Toast} from '@ant-design/react-native';
import {px2dp, px2sp} from '../utils/ScreenUtil';
import Color from '../app/Color';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
    };
  };
  onPhoneChanged = newValue => {
    this.setState({phone: newValue});
  };
  onPasswordChanged = newValue => {
    this.setState({password: newValue});
  };
  fetchLogin = () => {
    if (this.state.phone == '' && this.state.password == '') {
      Toast.info('手机号码或密码不能为空');
    } else {
      this.fetchData(this.state.phone, this.state.password);
    }
  };

  // 网络请求
  fetchData(loginId, password) {
    const {navigation} = this.props;
    global.storage.save({
      key: 'user',
      data: '1',
      expires: null,
    });
    NavigationUtil.reset(navigation, 'Home');
    // AuthApi.fetchLogin(loginId, password)
    //     .then(result=>{
    //         if (result.code === 0) {
    //             var user = {
    //                 type: result.type,
    //                 token: result.token,
    //                 isLogin: true
    //             };
    //             global.storage.save({
    //                 key:'user',
    //                 data: user,
    //                 expires: null
    //             });
    //             const {navigation} = this.props;
    //
    //         } else if (result.code === 3) {
    //             Toast.info('用户名或密码错误')
    //         }
    //     })
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/bgc.png')}
        style={styles.container}>
        <View style={styles.warpper}>
          <Image source={require('../images/shop.png')} />
          <View style={styles.loginForm}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="输入手机号码"
              keyboardType="phone-pad"
              onChangeText={this.onPhoneChanged}
            />
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="输入密码"
              secureTextEntry={true}
              onChangeText={this.onPasswordChanged}
              onSubmitEditing={this.fetchLogin}
            />
            <TouchableOpacity onPress={this.fetchLogin}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitText}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warpper: {
    flex: 1,
    marginTop: '25%',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    position: 'absolute',
    zIndex: 2,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: px2sp(55),
  },
  subTitle: {
    marginTop: px2dp(10),
    fontSize: px2sp(28),
  },
  loginForm: {
    marginTop: '15%',
  },
  textInput: {
    backgroundColor: Color.white,
    borderRadius: 4,
    height: px2dp(80),
    fontSize: px2sp(30),
    marginBottom: px2dp(20),
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
  },
  submitBtn: {
    marginTop: px2dp(20),
    height: px2dp(80),
    backgroundColor: '#52DA78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  submitText: {
    color: '#fff',
    fontSize: px2sp(30),
  },
});
