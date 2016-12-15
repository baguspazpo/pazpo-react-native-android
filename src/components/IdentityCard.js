/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Image
} from 'react-native';

class IdentityCard extends Component {

  componentWillUnmount(){
      BackAndroid.removeEventListener('hardwareBackPress', () => {
          if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
              this.navigator.pop();
              return true;
          }
          return false;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.uploadText}>
          Silahkan upload foto kartu nama anda !
        </Text>

        <View>
            <Image
              style={styles.kamera}
              source={require('./img/img_form_circle_camera.png')}
            />
        </View>

        <Text style={styles.fotoText}>
          Ambil foto dengan kamera
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  uploadText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    width: 250,
    marginBottom : 73,

  },
  kamera : {
    width: 150, 
    height: 150,
  },

  fotoText : {
    fontSize : 18,
    textAlign: 'center',
    marginTop: 33
  }
});

export default IdentityCard;

