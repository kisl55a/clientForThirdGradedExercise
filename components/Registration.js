import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const Registration = (props) => {
    return (
        <View style={styles.container}>
            <Text>Registration</Text>
            <Button
        title="Login"
        onPress={() => props.navigation.navigate('login')}
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
    }, 
})
export default Registration
