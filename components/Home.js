import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import ItemSmall from './ItemSmall'
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


const Home = () => {
    return (
        <ScrollView>
            <View  style={styles.container}>
            <ItemSmall></ItemSmall>
            <ItemSmall></ItemSmall>
            <ItemSmall></ItemSmall>
            <ItemSmall></ItemSmall>
            <ItemSmall></ItemSmall>
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
    box: {
        width: "95%",
        height: 150,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: "center",
        flexDirection: "row",
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
    }
});

export default Home
