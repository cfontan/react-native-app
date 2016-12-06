
import React, {Component} from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
} from 'react-native';
import AuthService from './services/AuthService';
import moment from 'moment';

class PushPayload extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      events: props.events
    };
  }


  render(){
    return(
      <View style={styles.container}>
        <Image
          source={{uri: this.state.events.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}
        />
        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>
        {moment(this.state.events.created_at).fromNow()}
        </Text>
        <Text>{this.state.events.actor.login}</Text>
        <Text>{this.state.events.repo.name}</Text>
        <Text></Text>
        <Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

module.exports = PushPayload;
