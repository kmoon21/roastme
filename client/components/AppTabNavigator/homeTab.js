import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import MyButton from '../button';
import { connect } from 'react-redux'
import { setPostID } from '../actions'

class HomeTab extends Component {

    static navigationOptions = {

        // tabBarIcon: ({tintColor}) => (
        //     <Icon name="ios-home" style={{ color: tintColor}} />
        // )
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={{
                        height: this.startHeaderHeight, backgroundColor: 'white',
                        borderBottomWidth: 1, borderBottomColor: '#dddddd'
                    }}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: '700', margin: 5, justifyContent: 'center' }}>Welcome Player Haters!!</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Image source={require('../../assets/haters.jpg')}
                            style={{ height: 275, width: 375 }}
                        />
                        <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 15 }}>
                            Introducing RoastMe</Text>
                        <Text style={{ fontWeight: '100', marginTop: 10 }}>
                            A roast is a form of American humor in which an individual, a guest of honor, is subjected to jokes at their expense.
                        </Text>
                        <Text
                            style={{ fontWeight: '100', marginTop: 10 }}>
                            This app allows someone to take a picture of a Roastee, with the implication that the person is able to take jokes in good humor,
                            and invites friends and strangers to come up with the best roasts possible.
                        </Text>
                        <Text
                            style={{ fontWeight: '100', marginTop: 10 }}>This platform does not support bullying in any form.
                        </Text>
                        <Text
                            style={{ fontWeight: '100', marginTop: 10 }}>Have fun, and let the roasts begin!
                        </Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center', marginTop: 15 }}
                        extraData={this.props.posts}
                        data={this.props.posts}
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.props.setPostID(item.id)
                                this.props.navigation.navigate('Roast');
                            }}>
                                <Image source={{ uri: item.url }} style={{ height: 250, width: 300 }} />
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '100', margin: 10 }}>{item.caption}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.db.posts
})

const mapDispatchToProps = dispatch => ({
    setPostID: id => dispatch(setPostID(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})