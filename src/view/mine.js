import React from 'react';
import {Text, View, Image} from 'react-native';

export default class ExampleApp extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '我的',
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <Image source={require('../images/mine_active.png')} />;
        } else {
          return <Image source={require('../images/mine.png')} />;
        }
      },
    };
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
          source={require('../images/mine_body.png')}
        />
      </View>
    );
  }
}
