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
  TextInput
} from 'react-native';
import Callouts from './components/Callouts';
import Login from './login';

class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <Login/>
      //<Callouts/>

    );
  }
}






AppRegistry.registerComponent('Project', () => Project);
