import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Picker, Button } from 'react-native'
import Constants from 'expo-constants';
import ItemSmall from './ItemSmall';
import { ScrollView } from 'react-native-gesture-handler';

const Search = () => {
    const requestFunctions = require('./functions/requestsFunctions')
    const [searchWord, setSearchWord] = useState('')
    const [searchParam, setSearchParam] = useState('location')
    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        if (searchWord.trim() !== '') {
            requestFunctions.searchRequest(`https://graded-exercise-kidm.herokuapp.com/items/searchBy${searchParam}?${searchParam.toLowerCase()}=${searchWord}`)
            .then(data => {
                console.log(data)
                setItemsData(data)

            })
            .catch(err => console.log(err))
        }

    }, [searchWord])
    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
        <View style={styles.container}>
                       <Picker
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}

                    selectedValue={searchParam}
                    onValueChange={(value) =>
                        setSearchParam(value)
                    }>
                    <Picker.Item label="Location" value="Location" />
                    <Picker.Item label="Date" value="Date" />
                    <Picker.Item label="Category" value="Category" />
                </Picker>
                <TextInput
                name="searchWord"
                style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                onChangeText={(searchWord) => setSearchWord(searchWord)}
                value={searchWord}
            />
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
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    }, 
})
export default Search
