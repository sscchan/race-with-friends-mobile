import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import MyRuns from './MyRuns';
import MyStats from './MyStats';

export default class StatsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      runs: []
    };
  }

  componentWillMount() {
    this.getRunsData((result) => {
      this.setState ({
        runs: result
      });
    });    
  }

  getRunsData(callback) {
    let userId = this.props.userId;
    fetch('https://www.racewithfriends.tk:8000/users/' + userId + '/runs',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }  

  onTabChange(newTabIndex) {
    this.setState({
      currentTab: newTabIndex
    });
  }

  render() {
    const styles = StyleSheet.create({
       container: {
        flex: 1
      },
      center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }
    });

    const uiTheme = {
        palette: {
            primaryColor: COLOR.green500,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
    };

    return (
      <ThemeProvider uiTheme={uiTheme}>    
        <View style={styles.container}>
          <View style={styles.center}>
            {this.state.currentTab === 0 && <MyRuns userId={this.props.userId} runs={this.state.runs} /> }
            {this.state.currentTab === 1 && <MyStats userId={this.props.userId} runs={this.state.runs} />  }
          </View>
          <BottomNavigation
            labelColor="white"
            rippleColor="white"
            style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
            onTabChange={this.onTabChange.bind(this)}
          >
            <Tab
              barBackgroundColor="#00796B"
              label="My Runs"
              icon={<Icon size={24} color="white" name="directions-run" />}
            />
            <Tab
              barBackgroundColor="#37474F"
              label="My Stats"
              icon={<Icon size={24} color="white" name="show-chart" />}
            />
          </BottomNavigation>
        </View>
      </ThemeProvider>
    );
  }
}