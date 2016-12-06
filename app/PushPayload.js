
import React, {Component} from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';

class PushPayload extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.events.payload.commits),
      events: props.events
    };
  }

  renderRow(rowData){
    return(
      <View style={styles.rowContainer}>
        <Text>
          <Text style={styles.bold}>{
            rowData.sha.substring(0,6)}
          </Text> - {rowData.message}
        </Text>
      </View>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={{uri: this.state.events.actor.avatar_url}}
          style={styles.avatar}
        />
        <Text style={styles.whenLabel}>
        {moment(this.state.events.created_at).fromNow()}
        </Text>
        <Text><Text style={styles.bold}>{this.state.events.actor.login} </Text> pushed to </Text>
        <Text><Text style={styles.bold}>{this.state.events.payload.ref.replace('refs/heads/', '')}</Text></Text>
        <Text><Text style={styles.bold}>at {this.state.events.repo.name}</Text></Text>
        <Text style={styles.commitHeading}>
          {this.state.events.payload.commits.length} Commits
        </Text>
        <ListView
          contentInset={{
            top: -50
          }}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
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
  },
  bold: {
    fontWeight: '800',
    fontSize: 16
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  commitHeading: {
    fontSize: 20,
    paddingTop: 40
  },
  whenLabel: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  }
})

module.exports = PushPayload;
