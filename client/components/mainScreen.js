import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import HomeTab from './AppTabNavigator/homeTab';
import RoastTab from './AppTabNavigator/roastTab';
import AddPostTab from './AppTabNavigator/addPostTab';
import { getAllPostsAsync, setPostID } from './actions'

const mapDispatchToProps = dispatch => ({
    getAllPostsAsync: () => dispatch(getAllPostsAsync()),
    setPostID: id => dispatch(setPostID(id))
})

class MainScreen extends Component {
    componentDidMount() {
        this.props.getAllPostsAsync();
    }
    render() {
        return (
            <AppTabNavigator />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainScreen);

const AppTabNavigator = createBottomTabNavigator({
    Home: HomeTab,
    Roast: RoastTab,
    Post: AddPostTab
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Roast') {
                    iconName = `ios-flame${focused ? '' : '-outline'}`;
                } else if (routeName === 'Post') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})