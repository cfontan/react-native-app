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
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
            />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          style={styles.tabItem}
          title="Search"
          selected={this.state.selectedTab == 'search'}
          onPress={()=> this.setState({selectedTab: 'search'})}>

          <Text style={styles.welcome}>
            Tab 2
          </Text>

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
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})


module.exports = AppContainer;
