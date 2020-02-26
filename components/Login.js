import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import base64 from 'react-native-base64'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../src/actions'

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
            <View style={{ alignSelf: "flex-start", backgroundColor: "#2196f3" }}>
    <Text style={{ color: "white" }}>Login{currentUser.username}</Text>
            </View>
            <TextInput
                name="username"
                style={{ height: "5%", width: "90%", borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(username) => setUsername(username)}
                value={username}
            />
            <TextInput
                name="password"
                style={{ height: "5%", width: "90%", borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(password) => setPassword(password)}
                value={password}
            />
            <Button
                title="Submit"
                onPress={() => sendLoginData()}
            />
             <Button
        title="Register"
        onPress={() => props.navigation.navigate('registration')}
      />
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
