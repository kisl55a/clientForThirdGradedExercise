import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState, useEffect } from 'react'

const Registration = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const requestFunctions = require('./functions/requestsFunctions')

    const sendRegistrationData = () => {
        if (password.trim() === '') {
            Alert.alert('The password field is empty')
        } else if (password !== password1) {
            console.log(password, password1)
            Alert.alert('The passwords are different')

        } else {
            requestFunctions.postData('https://graded-exercise-kidm.herokuapp.com/users', { username: username, password: password })
                .then((data) => {
                    props.navigation.navigate('login')
                    console.log(data.status)
                    console.log(data); // JSON data parsed by `response.json()` call
                })
                .catch(err => {
                    console.log(JSON.stringify(err))
                     Alert.alert('The username was taken already')
                });
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={{width: 300, height: 150, marginBottom: 50}}
                source={{uri: 'https://pngimage.net/wp-content/uploads/2018/06/your-company-logo-png-6.png'}}
            />
            <TextInput
                name="username"
                placeholder="Username"
                style={{ height: 35, width: "90%", borderColor: 'gray', fontSize: 18, textAlign: "center", borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(username) => setUsername(username)}
                value={username}
            />

            <TextInput
                name="password"
                placeholder="Password"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(password) => setPassword(password)}
                value={password}
            />
            <TextInput
                name="password"
                placeholder="Confirm password"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
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
                    marginTop: 30,
                    width: "90%",
                    borderRadius: 3,
                    marginBottom: 10
                }}
                onPress={() => sendRegistrationData()}>
                <Text style={{ color: "white", fontSize: 15 }}>Register </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    paddingTop: 5
                }}
                onPress={() => props.navigation.navigate('login')}>
                <Text style={{ textAlign: "center", color: "blue" }}> Go back to login
                </Text>
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
export default (Registration)
