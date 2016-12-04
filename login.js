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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.loginHeading}>Fraytr</Text>
        <TextInput
          onChangeText={(text)=> this.setState({username: text})}
          style={styles.loginInput}
          placeholder={'Enter username'}></TextInput>
        <TextInput
          onChangeText={(text)=> this.setState({password: text})}
          style={styles.loginInput}
          placeholder={'Enter password'} password={'true'}></TextInput>
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader} />
      </View>
    );
  }
  onLoginPressed(){
    console.log('Attempting to log in with username: ' + this.state.username);
      this.setState({showProgress: true});
      fetch('https://api.github.com/search/repositories?q=react')
      .then((response)=> {
        return response.json();
      })
      .then((results)=> {
        console.log(results);
        this.setState({showProgress: false});
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    alignItems: 'center',
    padding: 10,
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
  }


})

module.exports = Login;
