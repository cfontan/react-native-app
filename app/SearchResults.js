'use string';

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

const starIconURI =
  {uri: 'http://icons.iconarchive.com/icons/icons8/ios7/256/Messaging-Star-icon.png'};
const forkIconURI =
  {uri: 'http://imageog.flaticon.com/icons/png/512/25/25406.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'}
const issueIconURI =
  {uri: 'http://www.clipartbest.com/cliparts/nTB/BAj/nTBBAjkTA.jpeg'};

class SearchResults extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }

  componentDidMount(){
    this.doSearch();
  }

  doSearch(){
    let url = 'https://api.github.com/search/repositories?q=' +
      encodeURIComponent(this.state.searchQuery);

    fetch(url)
    .then((response)=> response.json())
    .then((responseData)=> {
      let responseDataItems = responseData.items.slice(0,20);

      this.setState({
        repositories: responseData.repositories,
        dataSource:
          this.state.dataSource.cloneWithRows(responseDataItems),
        showProgress: false
      });
    })
    .catch((err)=> {
      throw err;
    }).finally(()=> {
      this.setState({
        showProgress: false
      });
    });
  }

  renderRow(rowData){
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowHeader}>
          {rowData.full_name}
        </Text>
        <View style={styles.rowDetails}>
          <View style={styles.repoCell}>
            <Image
              source={starIconURI}
              style={styles.repoCellIcon}
            />
            <Text style={styles.repoCellLabel}>
              {rowData.stargazers_count}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image
              source={forkIconURI}
              style={styles.repoCellIcon}
            />
            <Text style={styles.repoCellLabel}>
              {rowData.forks}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image
              source={issueIconURI}
              style={styles.repoCellIcon}
            />
            <Text style={styles.repoCellLabel}>
              {rowData.open_issues}
            </Text>
          </View>
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
    paddingTop: 60,
    justifyContent: 'flex-start'
  },
  rowContainer: {
    flex: 1,
    padding: 20,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  rowDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  rowHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  repoCell: {
    flex: 1,
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center',
    color: 'black'
  }
})

module.exports = SearchResults;
