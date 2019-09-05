// import React from 'react';
// import {WebView} from 'react-native-webview';

// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: '有好货',
//   };
//   render() {
//     const {navigate} = this.props.navigation;
//     return <WebView source={{uri: this.props.navigation.state.params.url}} />;
//   }
// }
import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';

export default class ExampleApp extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '有好货',
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <Image source={require('../images/youhaohuo_active.png')} />;
        } else {
          return <Image source={require('../images/youhaohuo.png')} />;
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
          source={require('../images/zuisu.png')}
        />
      </View>
      // <ImageBackground
      //   style={{flex: 1, marginBottom: 10, marginTop: 10}}
      //   source={require('../images/zuisu.png')}
      // />
    );
  }
}
