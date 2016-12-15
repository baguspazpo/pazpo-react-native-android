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
  Image,
  TouchableHighlight
} from 'react-native';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Upload Kartu Nama',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class IdentityCard extends Component {

    uploadIdentityCard(){
      fetch('https://mywebsite.com/endpoint/', {
        method: 'POST',
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        })
      })
    }

    constructor(props) {
        super(props);
        this.state = { 
            avatarSource: '',
        };
    }

  launchImagePicker(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log("sudah pilih gambar");
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
}

  componentWillMount(){
      BackAndroid.addEventListener('hardwareBackPress', () => {
          if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
              this.props.navigator.pop();
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
          <TouchableHighlight onPress={() => this.launchImagePicker()}>
            <Image
              style={styles.kamera}
              source={require('./img/img_form_circle_camera.png')}
            />
          </TouchableHighlight>
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

