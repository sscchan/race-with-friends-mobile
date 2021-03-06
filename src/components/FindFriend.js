import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button
} from 'react-native';

import {ListItem} from 'react-native-material-ui';

export default class FindFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      text: '',
      users: [],
      allUsers: []
    }
    this.searchForFriend = this.searchForFriend.bind(this); //need this line?
  }

  componentDidMount() {
    fetch('https://racewithfriends.tk:8000/users/all')
    .then(response => {
      this.setState({
        users: JSON.parse(response._bodyInit),
        allUsers: JSON.parse(response._bodyInit)
      });
    })
    .catch(err => {
      console.warn(err);
    })
  }

  searchForFriend() {
    if (!this.state.text) {
      this.setState({users: this.state.allUsers})
    } else {
      var results = this.state.users.filter(user => {
        return user.fullname.includes(this.state.text)
      })
      this.setState({
        users: results
      })
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => {
            this.setState({text}, this.searchForFriend);
          }}
          value={this.state.text}
          placeholder='search for a friend'
        />
          <Button
            onPress={this.searchForFriend}
            title="Search"
            color="#841584"
          />
        <ScrollView>
        {
          this.state.users.map((user) => {
           return (
              <ListItem
                key={user.fb_id}
                divider
                leftElement={
                  <Image
                    style={{width: 50, height: 50}}
                    source={{uri: user.pic}}
                  />}
                centerElement={<Text style={styles.name}>{user.fullname}</Text>}
                onPress={() => {this.props.onAddFriend(user.fb_id);}}
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
    flexDirection: 'column',
    // justifyContent: 'left',
    // alignItems: 'left'
    // flex:1    //Step 1
  },
  name: {
    // marginLeft: 75
    textAlign: 'center'
  },
  empty: {
    marginRight: 50
  }
});