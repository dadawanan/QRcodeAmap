import React from 'react';
import {Image, View, ImageBackground, TouchableOpacity} from 'react-native';
import {SearchBar} from '@ant-design/react-native';
export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '首页',
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <Image source={require('../images/home_active.png')} />;
        } else {
          return <Image source={require('../images/home.png')} />;
        }
      },
    };
  };
  constructor() {
    super(...arguments);
    this.state = {
      value: '',
    };
    this.onChange = value => {
      this.setState({value});
    };
    this.clear = () => {
      this.setState({value: ''});
    };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <SearchBar
          value={this.state.value}
          placeholder="请输入商场或菜场"
          onSubmit={value => {
            alert(value);
          }}
          onBlur={value => {}}
          onCancel={this.clear}
          onChange={this.onChange}
        />
        <ImageBackground
          source={require('../images/homemap.jpg')}
          style={{width: '100%', height: '100%'}}>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 100}}
            onPress={() => {
              navigate('Detail');
            }}>
            <Image source={require('../images/bianzu.png')} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
