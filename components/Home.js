import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import ItemSmall from './ItemSmall'
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


const Home = () => {
    const [itemsData, setItemsData] = useState([])
    useEffect(() => {
        fetch('https://graded-exercise-kidm.herokuapp.com/items/getAllItems')
            .then(response => response.json())
            .then(data => {
                setItemsData(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
            <View style={styles.container}>
                {itemsData.map(element => {
                    return (
                        <ItemSmall key={element.id} data={element}></ItemSmall>
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
