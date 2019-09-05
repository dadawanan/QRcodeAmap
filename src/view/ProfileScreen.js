import React, {Component} from 'react';
import {
  Animated,
  View,
  Text,
  DeviceEventEmitter,
  StyleSheet,
  default as Easing,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(0),
      focusedScreen: true,
    };
  }
  static navigationOptions = {
    title: '扫码',
  };
  componentDidMount() {
    this.startAnimation();
    const {navigation} = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({focusedScreen: true}),
    );
    navigation.addListener('willBlur', () =>
      this.setState({focusedScreen: false}),
    );
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(this.state.moveAnim, {
      toValue: -200,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => this.startAnimation());
  };
  //  识别二维码
  // onBarCodeRead = result => {
  //   const {navigate} = this.props.navigation;
  //   const {data} = result;

  // };
  // debounce(callback, options) {
  //   let timer = null;
  //   let {timestamp = 500} = options;
  //   console.log(1);
  //   return data => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       callback.apply(this, data);
  //     }, timestamp);
  //   };
  // }
  throttle(callback, timestamp) {
    let lastClickTime = Date.now();
    return data => {
      const currentClickTime = Date.now();
      if (currentClickTime - lastClickTime > timestamp) {
        callback.call(this, data);
        lastClickTime = currentClickTime;
      }
    };
  }
  async navigateto(data) {
    const {navigate} = this.props.navigation;
    await navigate('shaoma', {
      code: data,
    });
    DeviceEventEmitter.emit('UPDATE_USER_DATA');
  }
  render() {
    const {hasCameraPermission, focusedScreen} = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (focusedScreen) {
      return this.cameraView();
    } else {
      return <View />;
    }
  }
  cameraView() {
    let debounceAjax = this.throttle(this.navigateto, 5000);
    function onBarCodeRead(result) {
      const {data} = result;
      debounceAjax(data);
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={Value => {
            onBarCodeRead(Value);
          }}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
            <Animated.View
              style={[
                styles.border,
                {transform: [{translateY: this.state.moveAnim}]},
              ]}
            />
            <Text style={styles.rectangleText}>
              将二维码放入框内，即可自动扫描
            </Text>
          </View>
        </RNCamera>
      </View>
    );
  }
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: '#00FF00',
  },
});

// import React from 'react';
// import {Text, View} from 'react-native';

// export default class ExampleApp extends React.Component {
//   static navigationOptions = ({navigation}) => {
//     return {
//       title: '扫码',
//     };
//   };
//   render() {
//     return (
//       <View>
//         <Text>扫码</Text>
//       </View>
//     );
//   }
// }
