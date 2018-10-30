import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { Icon, CardItem, Card, Left, Right, Body, Thumbnail } from 'native-base'
import { addCommentAsync } from '../actions';
import { connect } from 'react-redux';
import CommentList from '../comment-list';
import Button from '../button'

class RoastTab extends Component {
  state = {
    text: ''
  }

  render() {
    return this.props.post.url && (
      <ScrollView >
        <Card>

          <View style={styles.container}>
            <CardItem style={{
              marginTop: 10
            }}>
              <Left>
                <Thumbnail source={require('../../assets/kevin.jpg')} />
                <Body>
                  <Text>Kevin</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem >
              <Image source={{ uri: this.props.post.url }}
                style={{ height: 250, width: 400, flex: 1 }} />
            </CardItem>
            <TextInput
              maxLength={140}
              numberOfLines={4}
              multiline={true}
              onChangeText={(text) => { this.setState({ text }) }}
              value={this.state.text}
              placeholder="Add Roast"
              style={styles.textInput}
            />
            <Left>
              <Thumbnail source={require('../../assets/nelson.jpg')} />
            </Left>
            <Right>
              <Button
                onPress={() => {
                  this.setState({ text: '' })
                  this.props.addCommentAsync(this.state.text, this.props.post)
                }}
                style={styles.addRoast}
                text="Add Roast"
                textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}
              />
            </Right>
            <View style={{ height: 300 }}>
              <CommentList
              />
            </View>
          </View>

        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  post: state.db.posts.find(x => x.id === state.db.postID),
  // posts: state.db.posts
})

const mapDispatchToProps = dispatch => ({
  addCommentAsync: (comment, post) => dispatch(addCommentAsync(comment, post))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoastTab);

// export default RoastTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
    width: 300,
    padding: 15
  },
  addRoast: {
    backgroundColor: '#d27c20',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 150,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10
  }
})