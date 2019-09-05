import React from 'react';
import {View, StatusBar, Text, TouchableOpacity, Image} from 'react-native';
export default class topbar extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgb(108,166,47)',
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <StatusBar />
        <Text />
        <View>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>食品安全追溯体系</Text>
          </View>
        </View>
        {this.renderRight()}
      </View>
    );
  }
  renderRight() {
    //console.log(this.props);
    const {navigate} = this.props.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => navigate('Profile', {name: 'Jane'})}
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 30, height: 30, marginRight: 20}}
          source={require('../images/saoma.png')}
        />
      </TouchableOpacity>
    );
  }
}
