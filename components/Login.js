import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const sendLoginData = () => {
      console.log('asdasda')
    }
    return (
        <View style={styles.container}>
            <Text>Login {username}</Text>
            <TextInput
                name="username"
                style={{ height: "5%", width: "90%", borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(username) => setUsername(username)}
                value={username}
            />
            <Button
                title="Submit"
                onPress={() => sendLoginData()}
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
export default Login
