import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import base64 from 'react-native-base64'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../src/actions'
import { Ionicons, Entypo, AntDesign } from 'react-native-vector-icons';
import { withOrientation } from 'react-navigation'

const Login = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const sendLoginData = () => {
        fetch("https://graded-exercise-kidm.herokuapp.com/users/login", {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Basic ${base64.encode(`${username}:${password}`)}`

            }),
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then(json => {
                console.log("Login successful")
                console.log("Received following JSON");
                dispatch(allActions.userActions.setUser({
                    username: username,
                    token: json.token
                }))

            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
    }
    return (
        <View style={styles.container}>
            <Text>Username</Text>
            <TextInput
                name="username"
                style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                onChangeText={(username) => setUsername(username)}
                value={username}
            />

            <Text>Password</Text>
            <TextInput
                name="password"
                style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                onChangeText={(password) => setPassword(password)}
                value={password}
            />

            <TouchableOpacity
            style ={{
                borderWidth: 1,
                borderColor: 5,
                alignItems: 'center',
                backgroundColor: '#009d00',
                padding: 10,
                width: 150,
                borderRadius: 5, 
                marginBottom: 10
            }}
            onPress={() => sendLoginData()}>
                <Text style={{color: "white"}}>Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style ={{
                borderWidth: 1,
                borderColor: 5,
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                borderRadius: 5, 
                width: 150, 
                marginBottom: 10
            }}
            onPress={() => props.navigation.navigate('registration')}>
                <Text>Back </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    }
})
export default (Login)
