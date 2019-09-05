/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/view/Home';
import ProfileScreen from './src/view/ProfileScreen';
import {MainComponent} from './src/navigation/TabNavigator';
import mine from './src/view/mine';
import dianping from './src/view/dianping';
import shaoma from './src/view/shaoma';
import youhaohuo from './src/view/youhaohuo';
import qidongye from './src/view/qidongye';
import LoginScreen from './src/view/LoginScreen';
import Detail from './src/view/detail';
import storage from './src/utils/Storage';
const MainNavigator = createStackNavigator(
  {
    Home: {screen: MainComponent},
    Splash: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
    youhaohuo: {screen: youhaohuo},
    shaoma: {screen: shaoma},
    dianping: {screen: dianping},
    mine: {screen: mine},
    qidongye: {screen: qidongye},
    LoginScreen: {screen: LoginScreen},
    Detail: {screen: Detail},
  },
  {
    initialRouteName: 'qidongye', // 默认显示界面
    mode: 'card', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    headerLayoutPreset: 'center', //让标题居中
    navigationOptions: {
      header: null,
    },
  },
);

const App = createAppContainer(MainNavigator);

export default App;
