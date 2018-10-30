import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import { Icon } from 'native-base';
// import Camera from '../cameraComponent';
import { addPostAsync } from '../actions'
// For Taking Photo (Camera)
import { Permissions, ImagePicker } from 'expo';
import Button from '../button'

// Firebase Related Code
import uuid from 'uuid';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCeM-0578gmGJ-brahKQjfXtWXWDLtDkHU",
    authDomain: "roast-me-e7ec2.firebaseapp.com",
    databaseURL: "https://roast-me-e7ec2.firebaseio.com",
    projectId: "roast-me-e7ec2",
    storageBucket: "roast-me-e7ec2.appspot.com",
    messagingSenderId: "656671236641"
};

firebase.initializeApp(config);

// uploads a local image (uri parameter represents local image location)
// to firebase and then returns the url of the image from firebase
const uploadImageAsync = async uri => {
    const response = await fetch(uri);

    const blob = await response.blob();
    const generated_id = uuid.v4();
    const ref = firebase
        .storage()
        .ref()
        .child(generated_id);

    const snapshot = await ref.put(blob);
    let downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
}

class AddPostTab extends Component {
    state = {
        imageSource: '',
        caption: ''
    }

    takePic = async () => {
        const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission === 'granted' && cameraRollPermission === 'granted') {
            let camera_event = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1.91, 1]
            });

            console.log("CAMERA_EVENT:", camera_event);

            if (!camera_event.cancelled) {
                let uploadedURL = await uploadImageAsync(camera_event.uri);

                console.log("RESULT UPLOAD:", uploadedURL);

                this.setState({ imageSource: uploadedURL })
            }
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700' }}>Add a new Roastee here!</Text>
                    <Image source={require('../../assets/chair.jpg')}
                        style={{ height: 300, width: 300, margin: 10 }}
                    />
                    <Text style={{ fontWeight: '100', marginTop: 5 }}>Who will dare sit on the Iron Throne?</Text>
                    <Button
                        onPress={this.takePic}
                        style={styles.openCamera}
                        text="Open Camera"
                        textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 15 }} />
                    {this.state.imageSource && (
                        <Image
                            style={{ height: 250, width: 400, margin: 10 }}
                            source={{ uri: this.state.imageSource }}
                        />
                    )}
                    <TextInput
                        maxLength={140}
                        numberOfLines={4}
                        multiline={true}
                        onChangeText={(caption) => { this.setState({ caption }) }}
                        value={this.state.caption}
                        placeholder="Enter Caption..."
                        style={styles.textInput}
                    />
                    <Button
                        // onPress={() => { this.props.addComment(this.state.text) }}
                        onPress={() => {
                            this.setState({
                                imageSource: '',
                                caption: ''
                            })
                            this.props.addPostAsync(this.state.imageSource, this.state.caption)
                        }}
                        style={styles.submit}
                        text="Add Post"
                        textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    post: state.db.posts.find(x => x.id === state.db.postID)
})

const mapDispatchToProps = dispatch => ({
    addPostAsync: (url, caption) => dispatch(addPostAsync(url, caption))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPostTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
        width: 300,
        padding: 15
    },
    openCamera: {
        backgroundColor: '#686754',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10
    },
    submit: {
        backgroundColor: '#bc5715',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10
    }
})