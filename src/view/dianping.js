import React from 'react';
import {Text, View, Image} from 'react-native';

export default class ExampleApp extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '点评',
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <Image source={require('../images/dianpin_active.png')} />;
        } else {
          return <Image source={require('../images/dianpin.png')} />;
        }
      },
    };
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>正在开发中..</Text>
      </View>
    );
  }
}
