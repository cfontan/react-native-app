
import React, {Component} from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';
import AuthService from './services/AuthService';


class Feed extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(['A','B','C']),
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
      console.log(authInfo.header);
      fetch(url,{
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((resonseData)=> {
        console.log(resonseData);
        var feedItems = resonseData.filter((ev)=>
          ev.type == 'ForkEvent');
        this.setState({dataSource:
          this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      });
    })
  }

  renderRow(rowData){
    return (
      <View style={styles.rowItems}>
        <Image
          source={{uri: rowData.actor.avatar_url}}
          style={styles.avatar}
        />
        <View style={{
          padding: 20
        }}>
          <Text style={{backgroundColor: '#FFF'}}>
            {rowData.created_at}
          </Text>
          <Text style={{backgroundColor: '#FFF'}}>
            {rowData.actor.login}
          </Text>
          <Text style={{backgroundColor: '#FFF'}}>
            {rowData.repo.name}
          </Text>
        </View>
      </View>
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
    justifyContent: 'flex-start'
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  rowItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18
  }
})

module.exports = Feed;
