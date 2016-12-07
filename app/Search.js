'use strict';

import React, {Component} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import SearchResults from './SearchResults';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){

    return(
      <View style={styles.container}>
        <TextInput
          onChangeText={(text)=> this.setState({searchQuery: text})}
          style={styles.input}
          placeholder={'Search'}>
        </TextInput>
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    );
  }


  onSearchPressed(){
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 10,
    alignItems: 'center',
  },
  input: {
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
  }
})

module.exports = Search;
