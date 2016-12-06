
import React, {Component} from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';
import AuthService from './services/AuthService';
import moment from 'moment';
import PushPayload from './PushPayload';


class Feed extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount(){
    this.fetchFeed();
  }

  fetchFeed(){
    AuthService.getAuthInfo((err, authInfo)=> {
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/events';

      fetch(url,{
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((resonseData)=> {

        var feedItems = resonseData.filter((ev)=>
          ev.type == 'PushEvent');
        this.setState({dataSource:
          this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      })
      .catch((err)=> {
        throw err;
      });
    })
  }

  pressRow(rowData){
    this.props.navigator.push({
      title: 'Events',
      component: PushPayload,
      passProps: {
        events: rowData
      }
    });
  }

  renderRow(rowData){
    return (
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData)}
        underlayColor='#ddd'
      >
        <View style={styles.rowContainer}>
          <Image
            source={{uri: rowData.actor.avatar_url}}
            style={styles.avatar}
          />
          <View style={styles.rowTextContainer}>
            <Text>
              {moment(rowData.created_at).fromNow()}
            </Text>
            <Text>
              {rowData.actor.login + ' ' + rowData.type}
            </Text>
            <Text>
              {rowData.repo.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render(){
    if(this.state.showProgress){
      return(
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            size="large" />
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <ListView
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
    paddingTop: 60,
    justifyContent: 'flex-start'
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  rowTextContainer: {
    padding: 20
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18
  }
})

module.exports = Feed;
