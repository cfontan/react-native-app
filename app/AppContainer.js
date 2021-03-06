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
import AuthService from './services/AuthService';
import Login from './Login';

const base64FeedIcon =
  'data:image/png;base64,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';
const base64SearchIcon =
  'data:image/png;base64,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';
const base64LogoutIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEMUlEQVR4Xu3dPYoUURTF8TOBgoZ+4Cb8ShQFAyM1FIZBIxEDY0FwFYKxIGgqCK5AzfzYhrgCXYBS2AYzdnX1zH331Tuv/p3O9K1b5/zs7qHtrh1xW3QCO4s+e05eAFg4AgAAYOEJLPz0xx4Bnkq6vvBsIqf/XNLXyIBa9x0D8E7Sbq0lOjzOnqQhw+ZvAMipCAA5udpMBYBNVTmLdgngu6QvOXlZT723ZvsuAbyVdN+6qpzlfwMgJ1iXqQBwaSppTwAkBesyFgAuTSXtCYCkYF3GAsClqaQ9AZAUrMtYALg0lbQnAJKCdRkLAJemkvYEQFKwLmMB4NJU0p4ASArWZSwAXJpK2hMAScG6jAWAS1NJewIgKViXsQBwaSppTwAkBesyFgAuTSXtCYCkYF3GAsClqaQ9AZAUrMtYALg0lbQnAJKCdRkLAJemkvYEQFKwLmMB4NJU0p4ASAqWsRUSOMw3hPDp4PxCLks6Kelz/qH+HgEAtZKePs5Q/gdJxyTdqYUAANPF1PiNS5I+Sjq1OtivWggAUKPezccYyh/+5Z8+8GtVEABgfgAPJL0ZeTpORwCA+QEMGzyS9GoOBABoA8A2CG5nfEkXANoBMAsCALQFoDoCALQHoCoCALQJoBoCALQLoAoCALQNYBsEtyLXJgBA+wBSEQDAA0AaAgD4AEhBAAAvAMURAMAPQFEEAPAEMIXgp6ThvYPJK5cBwBdAEQROAK5KeubdV8r2NySdG5k8+UjgBOCupPcpEfY9dCMCAPRd/r+zG0UAAACsTWDdpWPn/lwATwFHw9rNU8AVScNFrbntT+DmUl4EUvz/CTyW9PKofwEM93N6DQCA/QmEyweAL6ki5QPAE0Cx8gHgB6Bo+QDwAlC8fAD4AEgpHwAeANLKB0D7AFLLB0DbANLLB0C7AKqUD4A2AVQrHwDtAahaPgDaAlC9fAC0A2CW8gHQBoCHkl5H3tKNnAZvB0fSK3Pf86vvCDx7YNzk/+gtcXgAlEgxPmNA8EnSmdWoKuXzFBAvruSEC6tHguPbfqqnxMF5BCiRYrkZFyWdkPSt3MjNkwBQK+lGjwOAeDFcMCKeofUEAFjXF18eAPEMrScAwLq++PIAiGdoPQEA1vXFlwdAPEPrCQCwri++PADiGVpPAIB1ffHlARDP0HoCAKzriy8PgHiG1hMAYF1ffHkAxDO0ngAA6/riywMgnqH1BABY1xdfHgDxDK0nAMC6vvjyAIhnaD0BANb1xZcHQDxD6wkAsK4vvjwA4hlaTwCAdX3x5QEQz9B6AgCs64svvxgAP2p+bDneS7UJu2uOtCdpuO5S87fDfDq4+ZNpaEEANFTGHKsAYI7UGzomABoqY45V7AE8kXRtjuQ6OeYLlxfMYy8CO+mB05hKAABTCXX+cwB0XvDU6QFgKqHOfw6AzgueOr0/oSzokL8OnmsAAAAASUVORK5CYII=';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }
  render(){
    return(
      <TabBarIOS>
        <TabBarIOS.Item
          title="Feed"
          icon={{uri: base64FeedIcon, scale: 7}}
          selected={this.state.selectedTab =='feed'}
          onPress={()=> this.setState({selectedTab: 'feed'})}>

          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          icon={{uri: base64SearchIcon, scale: 7}}
          selected={this.state.selectedTab == 'search'}
          onPress={()=> this.setState({selectedTab: 'search'})}>

          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
            />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Logout"
          icon={{uri: base64LogoutIcon, scale: 7}}
          selected={this.state.selectedTab == 'logout'}
          onPress={this.onLogoutPressed.bind(this)}>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>Logging user out..</Text>
          </View>

        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

  onLogoutPressed(){
    this.setState({selectedTab: 'logout'});
    AuthService._userLogout();
    if(this.props.onLogout){
      console.log('logout hit');
      this.props.onLogout();
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


module.exports = AppContainer;
