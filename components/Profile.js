import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../src/actions/index'
const requestFunctions = require('./functions/requestsFunctions');

const Profile = () => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    useEffect(() => {
        requestFunctions.authorizedGetRequest('https://graded-exercise-kidm.herokuapp.com/items/', currentUser.token)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <View style={styles.container}>
            <Text>Hello, {currentUser.username}</Text>
            <Button onPress={() => 
            dispatch(allActions.userActions.setUser({
                username: '',
                token: ''
            }))}
            title = 'Logout'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Profile
