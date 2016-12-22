import { Text, Image, StyleSheet, View, TextInput, Button,
    TouchableHighlight, TouchableOpacity, BackAndroid} from 'react-native';
import React, {Component} from 'react';

class ClientForm extends Component {

    componentWillMount(){
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }

    render(){
        return(

            <View style={styles.container}>

                <Text style={styles.PropertyTypetext} >
                    Jenis Property
                </Text>

                <View style={styles.PropertyType}>

                    <View>
                        <Text style={styles.jualText}>
                            Jual
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.jualText}>
                            Sewa
                        </Text>
                    </View>

                </View>

            </View>

        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#faf8ee',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  PropertyTypetext : {
      fontSize : 15,
      color : 'black',
      marginBottom : 15,
      marginTop : 25
      
  },

  PropertyType : {
    flex : 1,
    justifyContent : 'space-around',
    flexDirection : 'row',
    backgroundColor : 'white',
    width: 280,
    height : 40
  },

  jualText : {
      textAlign: 'center',
      color : 'black',
      fontSize : 15,
      width : 135,
      height : 40
  }

});

export default ClientForm;