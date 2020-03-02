import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import ProfileItemSmall from './ProfileItemSmall'
import allActions from '../src/actions/index'
const requestFunctions = require('./functions/requestsFunctions');


const Profile = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const trigger = useSelector(state => state.currentItem.trigger)
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([])
    const [reloadTrigger, setReloadTrigger] = useState([])
    useEffect(() => {
        requestFunctions.authorizedGetRequest('https://graded-exercise-kidm.herokuapp.com/items/', currentUser.token)
            .then(data => {
                setItemsData(data)
            })
            .catch(err => console.log(err))
    }, [trigger])
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 30, marginBottom: 10}}>Hello, {currentUser.username}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Button onPress={() =>
                            dispatch(allActions.userActions.setUser({
                                username: '',
                                token: ''
                            }))}
                            title='Add new item'
                        />
                        <Button onPress={() =>
                            dispatch(allActions.userActions.setUser({
                                username: '',
                                token: ''
                            }))}
                            title='Logout'
                        />
                    </View>
                </View>
                {itemsData.map(element => {
                    return (
                        <ProfileItemSmall {...props} key={element.id} data={element}></ProfileItemSmall>
                      )
                })}
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: "center"
    },
    header: {
        width: "100%",
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Profile
