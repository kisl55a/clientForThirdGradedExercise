import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

const Registration = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [message, setMessage] = useState('')

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
    const sendRegistrationData = () => {

        if (password !== password1) {
            console.log(password, password1)
            setMessage('The passwords are different')

        } else {
            setMessage('')
            postData('https://graded-exercise-kidm.herokuapp.com/users', { username: username, password: password })
                .then((data) => {
                    props.navigation.navigate('login')
                    console.log(data); // JSON data parsed by `response.json()` call

                });
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, marginBottom: 20, color: "red" }}>{message}</Text>
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
            <Text>Password again</Text>
            <TextInput
                name="password"
                style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                onChangeText={(password1) => setPassword1(password1)}
                value={password1}
            />
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 5,
                    alignItems: 'center',
                    backgroundColor: '#009d00',
                    padding: 10,
                    width: 150,
                    borderRadius: 5,
                    marginBottom: 10
                }}
                onPress={() => sendRegistrationData()}>
                <Text style={{ color: "white" }}>Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 5,
                    alignItems: 'center',
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    marginBottom: 10
                }}
                onPress={() => props.navigation.navigate('login')}>
                <Text>Login</Text>
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
    },
})
export default Registration
