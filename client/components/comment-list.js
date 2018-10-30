import React from 'react';
import { FlatList, View, Text, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon } from 'native-base';

import {
    upvotePostAsync,
    downvotePostAsync
} from './actions'



const CommentList = props => {

    const { width, height } = Dimensions.get("screen")

    return (
        <FlatList
            extraData={props.post.comments}
            data={props.post.comments}
            renderItem={({ item }) => (
                <View style={{
                    backgroundColor: '#d9c2b4',
                    borderRadius: 10,
                    height: 100,
                    width: 400,
                    padding: 15,
                    marginVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View
                    style={{width: width - 200}}>
                        <Left>
                            <Text>{item.comment}</Text>
                        </Left>
                    </View>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <Button
                            onPress={() => { props.upvotePostAsync(props.post, item.id) }}
                            title="⬆️"
                        />
                        <Text style={{ marginVertical: 15 }}>{item.upvotes - item.downvotes}</Text>
                        <Button
                            onPress={() => { props.downvotePostAsync(props.post, item.id) }}
                            title='⬇️'
                        />
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index + ''}
        />
    )
}

const mapStateToProps = state => ({
    post: state.db.posts.find(x => x.id === state.db.postID)
})


const mapDispatchToProps = dispatch => ({
    upvotePostAsync: (post, id) => dispatch(upvotePostAsync(post, id)),
    downvotePostAsync: (post, id) => dispatch(downvotePostAsync(post, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
