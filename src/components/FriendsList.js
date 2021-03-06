import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from 'react-native';

import {ListItem} from 'react-native-material-ui';

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      text: '',
      searchable: true
    }
  }


  render() {
    return (
      <View>
      {(this.props.searchable) ?
        <Button
          title="Search"
          style={{ text: { color: 'white' } }}
          onPress={this.props.onButtonPress}
        />
        : <View></View>
      }
        <ScrollView>
        {
          this.props.friends.map((friend) => {
           return (
              <ListItem
                key={friend.fb_id}
                divider
                leftElement={
                  <Image
                    style={{width: 50, height: 50}}
                    source={{uri: friend.pic}}
                  />}
                centerElement={<Text style={styles.name}>{friend.fullname}</Text>}
                rightElement={friend.selected ?
                  <Image
                    source={require('../../assets/images/green-check-mark.png')}
                    style={{width: 20, height: 20}}
                  />
                  : <Text style={styles.empty}></Text>}
                onPress={() => {this.props.onFriendSelect(friend);}}
              />
            );
          })
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row'
  },
  name: {
    textAlign: 'center'
  },
  empty: {
    marginRight: 50
  }
});