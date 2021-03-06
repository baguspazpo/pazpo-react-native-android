/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { Text, AppRegistry, Image, StyleSheet, View, TextInput, Button, Alert, Navigator,
    TouchableHighlight, Picker, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {Component} from 'react';
import AccountKit from 'react-native-facebook-account-kit'

class Register extends Component {

  login() {
    AccountKit.loginWithPhone()
    .then((token) => {
      if (!token) {
        Alert.alert('User membatalkan login.');
      } else {
        this.getPhoneNumber(token.token)
      }
    })
    .catch((e) => {
      if (e.code != 'cancel') {
      Alert.alert('Login gagal! Silahkan coba kembali.')
      }
      console.log('Failed to login', e)
    })
  }

  submitRegister(id, name, email, hp, province, company) {
    if (name == ""){
      Alert.alert ("Nama tidak boleh kosong");
    } else if (hp == "") {
      Alert.alert ("Nomor Handphone tidak boleh kosong");
    } else if (email == "") {
      Alert.alert ("Email tidak boleh kosong");
    } else if (province == "") {
      Alert.alert ("Pilih Provinsi terlebih dahulu");
    } else if (company == "") {
      Alert.alert ("Pilih Company terlebih dahulu");
    } else {
      this.props.navigator.push({
        id: id,
        passProps:
        {
          name : name,
          email : email,
          hp : hp,
          province : province,
          company : company,
          goBack: this.goBack,
        }
      })
    }
  }

  goBack() {
      this.props.navigator.pop()
  }

  constructor(props) {
        super(props);
        this.state = {
            nama: '',
            hp : '',
            email : '',
            province: [],
            company: [],
            selectedProvince: '',
            selectedCompany: ''
        };
    }

    componentWillMount() {
      AccountKit.configure({})
      fetch('http://223.27.24.155/api_pazpo/v2/LoadAllCompanyArea')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ province: responseJson.province.data });
          this.apiCompany(1);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onValueChange = (key: string, value: string) => {
      const newState = {};
      newState[key] = value;
      this.setState(newState);
      if (key == "selectedProvince") {
        this.apiCompany(value);
      }
    }

    apiCompany(pProvinceID){
      console.log('http://223.27.24.155/api_pazpo/v2/LoadAllCompany?pProvinceID='+pProvinceID);
      fetch('http://223.27.24.155/api_pazpo/v2/LoadAllCompany?pProvinceID='+pProvinceID)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ company: responseJson.company.data });
          console.log('Company has been loaded');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getPhoneNumber = (token) => {
      fetch('https://graph.accountkit.com/v1.1/me/?access_token='+token)
        .then((response) => response.json())
        .then((responseJson) => {
          this.checkPhoneNumber('0'+responseJson.phone.national_number);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    checkPhoneNumber(phoneNumber) {
      fetch('http://223.27.24.155/api_pazpo/v2/LoginProcess?pMobilePhone='+phoneNumber)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == "Success") {
            this.props.navigator.push({
              id: 'home',
              passProps: {
                goBack: this.goBack,
              }
            })
          } else {
            ToastAndroid.show(responseJson.description, ToastAndroid.SHORT);
          }
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.containerLogo}>

            <Image
              style={styles.logo}
              source={require('./logo_pazpo_full.png')}
            />

        </View>
        <View style={styles.form}>

            <TextInput
              style={styles.TextInput}
              onChangeText={(nama) => this.setState({nama})}
              placeholder="Nama"
              autoCapitalize="words"
              returnKeyType="next"
              underlineColorAndroid="#FFD43A"
              selectionColor="#FFD43A"
            />

            <TextInput
              style={styles.TextInput}
              onChangeText={(hp) => this.setState({hp})}
              keyboardType = 'numeric'
              placeholder="No Handphone"
              keyboardType="phone-pad"
              returnKeyType="next"
              underlineColorAndroid="#FFD43A"
              selectionColor="#FFD43A"
            />

            <TextInput
              style={styles.TextInput}
              onChangeText={(email) => this.setState({email})}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="done"
              underlineColorAndroid="#FFD43A"
              selectionColor="#FFD43A"
            />

            <Picker
                selectedValue={this.state.selectedProvince}
                mode="dropdown"
                onValueChange={this.onValueChange.bind(this, 'selectedProvince')}>

                {this.state.province.map((l,i) => {return <Picker.Item value={l.ProvinceID} label={l.ProvinceName} key={l.ProvinceID}  /> })}
            </Picker>

            <Picker
              selectedValue={this.state.selectedCompany}
              mode="dropdown"
              onValueChange={this.onValueChange.bind(this, 'selectedCompany')}>
              {this.state.company.map((l,i) => {return <Picker.Item value={l.CompanyID} label={l.CompanyName} key={l.CompanyID}  /> })}

            </Picker>

        </View>

        <TouchableOpacity style={styles.buttonSubmit} onPress = {() => this.submitRegister('identityCard', this.state.nama, this.state.email, this.state.hp, this.state.selectedProvince, this.state.selectedCompany)}>
          <Text style={styles.daftar}>DAFTAR</Text>
        </TouchableOpacity>

        <View style={styles.login}>
            <Text style={styles.welcome}>
              Sudah Punya Akun ?
            </Text>

            <TouchableHighlight onPress={ () => this.login() }>
              <View>
                <Text style={styles.logintext}>LOG IN</Text>
              </View>
            </TouchableHighlight>
        </View>

       </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  containerLogo: {
    marginTop: 5
  },

  logo : {
    width: 175,
    height: 56,
  },

  form : {
    marginTop : 40,
    alignSelf: 'center',
    justifyContent : 'space-around',
    flexDirection : 'column'
  },

  TextInput : {
    textAlign: 'center',
    width: 280
  },

  buttonSubmit : {
    marginTop : 30,
    width: 200,
    height: 40,
    backgroundColor : '#FFD43A',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  login : {
    flexDirection : 'row',
    justifyContent : 'center'
  },

  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    marginRight: 5
  },

  logintext : {
    fontSize: 14,
    textAlign: 'center',
    color : '#FFD43A',
    margin: 10,
    marginLeft: 0
  },

  daftar : {
    color : 'white',
    textAlign: 'center',
  }
});

export default Register;
