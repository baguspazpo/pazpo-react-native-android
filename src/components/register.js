/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { Text, AppRegistry, Image, StyleSheet, View, TextInput, Button, Alert, Navigator,
    TouchableHighlight, Picker, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

class Register extends Component {

  

  login(id, message) {
    this.props.navigator.push({
        id: id, passProps: {
                  message: message,
                  goBack: this.goBack,
                }
        })
  }

  submitRegister(id, name, email, hp,) {
    this.props.navigator.push({
        id: id, passProps: {
                  name : name,
                  email : email,
                  hp : hp,
                  goBack: this.goBack,
                }
    })
  }

  goBack() {
      this.props.navigator.pop()
  }
    
  constructor(props) {
        super(props);
        this.state = { 
            nama: 'Nama',
            hp : 'No Handphone',
            email : 'Email',
            province: [],
            company: [],
            selectedProvince: '',
            selectedCompany: ''
        };
    }

    componentWillMount() {
      console.log('test');
      fetch('http://223.27.24.155/api_pazpo/v2/LoadAllCompanyArea')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ province: responseJson.province.data });
        })
        .catch((error) => {
          console.error(error);
        });
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
                onValueChange={this.onValueChangeArea.bind(this, 'selectedProvince')}>
                
                    {this.state.province.map((l,i) => {return <Picker.Item value={l.ProvinceID} label={l.ProvinceName} key={l.ProvinceID}  /> })}
            </Picker>

            <Picker
              selectedValue={this.state.cities}
              mode="dropdown"
              onValueChange={this.onValueChangeCompany.bind(this, 'selectedCompany')}>
              {this.state.company.map((l,i) => {return <Picker.Item value={l.CompanyID} label={l.CompanyName} key={l.CompanyID}  /> })}
              
            </Picker>


        </View>

        <TouchableOpacity style={styles.buttonSubmit} onPress = {() => this.submitRegister('identityCard', this.state.nama, this.state.email, this.state.hp)}>
          <Text style={styles.daftar}>DAFTAR</Text>
        </TouchableOpacity>

        <View style={styles.login}>
            <Text style={styles.welcome}>
              Sudah Punya Akun ?
            </Text>

            <TouchableHighlight onPress={ () => this.login('login', 'This is the login page!') }>
              <View>
                <Text style={styles.logintext}>LOG IN</Text>
              </View>
            </TouchableHighlight>
        </View>
       
       </View>
        
    );
  }


  onValueChangeArea = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
    console.log(newState);
    console.log(key);
    console.log(value);

    this.apiCompany(value);
    
  };

  onValueChangeCompany = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
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
    width: 140, 
    height: 45,
    marginTop: 5
  },

  form : {
    marginTop : 10,
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

