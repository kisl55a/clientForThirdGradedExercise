import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../src/actions'

const Login = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const requestsFunctions = require('./functions/requestsFunctions')

    const sendLoginData = () => {
        if (username.trim() == '' || password.trim() == '') {
            Alert.alert('Please input username and password')
        } else {
            requestsFunctions.getToken("https://graded-exercise-kidm.herokuapp.com/users/login", username, password)
                .then(json => {
                    console.log("Login successful")
                    console.log("Received following JSON");
                    setMessage('')
                    dispatch(allActions.userActions.setUser({
                        username: username,
                        token: json.token
                    }))

                })
                .catch(error => {
                    console.log("Error message:")
                    console.log(error.message)
                    setMessage('Invalid username or password')
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
                onPress={() => sendLoginData()}>
                <Text style={{ color: "white", fontSize: 15 }}>Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    paddingTop: 5
                }}
                onPress={() => props.navigation.navigate('registration')}>
                <Text style={{ textAlign: "center" }}> Havent got an account yet?{"\n"}
                    <Text style={{color: 'blue'}}>
                        Register here
                         </Text>
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
export default (Login)
