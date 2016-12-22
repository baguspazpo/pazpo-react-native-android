import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
import Chat from './Chat';
import Client from './Client';
import Header from './uikit/header';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {

  render() {
    return (
    	<View style={styles.container}>

    		<Header />

        <ActionButton
          style={styles.floatingButton}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { console.log("hi")}}
        />

	      <ScrollableTabView
          	tabBarUnderlineStyle={{backgroundColor:'#FFD43A' , borderColor : '#FAF7EE' , borderBottomWidth : 0.1 , borderBottomColor : '#FAF7EE'}}
            tabBarActiveTextColor={'#FFD43A'}
            tabBarBackgroundColor={'#FAF7EE'}>
	        <Chat tabLabel="Chat"/>
	        <Client tabLabel="Client" />
	      </ScrollableTabView>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },

    floatingButton : {
      zIndex : 9999
    }
});

export default Home;