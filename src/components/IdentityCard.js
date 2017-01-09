/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Image,
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from 'react-native';
import FormData from 'FormData';

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

  constructor(props) {
    super(props);
    this.state = {
        avatarSource: '',
        filenameImg: '',
    };
  }

  submitRegister(name, email, hp, province, company, imgIdentityCard){
    fetch('http://223.27.24.155/api_pazpo/v2/CreateAgentRegistration?pFullName='+ name + '&pEmail=' + email + '&pCompanyID=' + company + '&pMobilePhone=' + hp + '&pKTP=&pNameCard=' + imgIdentityCard + '&pCreatedBy=' + email)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status == 'Error') {
            ToastAndroid.show(responseJson.description, ToastAndroid.SHORT);
            this.props.navigator.push({
              id: 'register',
              passProps: {
                goBack: this.goBack,
              }
            })
          } else if (responseJson.status == 'Success') {
            this.props.navigator.push({
              id: 'register',
              passProps: {
                hp: responseJson.data.MobilePhone,
                email: responseJson.data.UserID,
                goBack: this.goBack,
              }
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  launchImagePicker(){
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Ready to call api');
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        var photo = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        var formData = new FormData();
        formData.append('image', photo);

        fetch('http://223.27.24.155/assets/uploader/pazpo_upload/identity.php', {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status == 'error') {
            ToastAndroid.show('Upload Foto Gagal!', ToastAndroid.SHORT);
          } else if (responseJson.status == 'success') {
            ToastAndroid.show('Upload Foto Sukses!', ToastAndroid.SHORT);
            this.submitRegister(this.props.name, this.props.email, this.props.hp, this.props.province, this.props.company, responseJson.data.filename);
          }
        })
        .catch((error) => {
          console.error(error);
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
