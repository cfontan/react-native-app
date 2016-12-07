'use strict';

import React, {Component} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import AuthService from './services/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }
  render(){
    var errorCtrl = <View/>;

    if (!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
        The username and password combination entered were incorrect. Try Again.
        </Text>
    }

    if (!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
        </Text>
    }


    return(

      <View style={styles.container}>
        <Text style={styles.loginHeading}>test app</Text>
        <TextInput
          onChangeText={(text)=> this.setState({username: text})}
          style={styles.loginInput}
          placeholder={'Enter username'}>
        </TextInput>
        <TextInput
          onChangeText={(text)=> this.setState({password: text})}
          style={styles.loginInput}
          placeholder={'Enter password'} password={'true'}>
        </TextInput>
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader} />
      </View>
    );
  }


  onLoginPressed(){

    this.setState({showProgress: true});

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results)=> {

      this.setState(Object.assign({
        showProgress: false
      }, results));

      if (results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    padding: 10,
    alignItems: 'center',
  },
  loginHeading: {
    padding: 10,
    fontSize: 40,
  },
  loginInput: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button:{
    height: 50,
    backgroundColor: '#43bbec',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    paddingTop: 10,
  }


})

module.exports = Login;
