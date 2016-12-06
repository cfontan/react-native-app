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
  TextInput,
  ActivityIndicator
} from 'react-native';

import Login from './app/Login';
import AppContainer from './app/AppContainer';
import AuthService from './app/services/AuthService';

var Project = React.createClass({
  componentDidMount: function() {
      AuthService.getAuthInfo((err, authInfo)=> {
        this.setState({
          checkingAuth: false,
          isLoggedIn: authInfo != null
        })
      })
  },
  render: function() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size='large'
            style={styles.loader} />
        </View>
      )
    }


    if(this.state.isLoggedIn){
      return (
        <AppContainer/>
      )
    }else {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  },
  onLogin: function(){
    this.setState({isLoggedIn: true});
  },
  getInitialState: function(){
    return {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  }
})




AppRegistry.registerComponent('Project', () => Project);
