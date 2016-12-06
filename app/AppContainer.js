'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';
import Callouts from './components/Callouts';
import Feed from './Feed';
import Search from './Search';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }
  render(){
    return(
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab =='feed'}
          onPress={()=> this.setState({selectedTab: 'feed'})}>

          <NavigatorIOS
            style={styles.navigator}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
            />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          onPress={()=> this.setState({selectedTab: 'search'})}>

          <NavigatorIOS
            style={styles.navigator}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
            />

        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigator: {
    flex: 1
  }
})


module.exports = AppContainer;
