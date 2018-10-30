import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'

const MyButton = props => {
    return (
        <View>
            <TouchableOpacity style={props.style} onPress={props.onPress}>
                <Text style={props.textStyle}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MyButton
