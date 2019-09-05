import React from 'react';
import {Text, View, Image} from 'react-native';

export default class ExampleApp extends React.Component {
  static navigationOptions = {
    title: '商家信息',
    headerStyle: {
      backgroundColor: 'rgb(108,166,47)',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{
            resizeMode: 'stretch',
            width: '100%',
            height: '100%',
          }}
          source={require('../images/detail.png')}
        />
      </View>
    );
  }
}
