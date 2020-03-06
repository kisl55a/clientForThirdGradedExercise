import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Picker, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ItemSmall from './ItemSmall'
import { Ionicons, Entypo, AntDesign, FontAwesome } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressLoader from 'rn-progress-loader';
import allActions from '../src/actions'


const Home = () => {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.currentItem.visible);
    const trigger = useSelector(state => state.currentItem.trigger);
    const requestFunctions = require('./functions/requestsFunctions');
    const [itemsData, setItemsData] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [searchParam, setSearchParam] = useState('location');
    useEffect(() => {
        dispatch(allActions.itemActions.setVisibleToTrue())
        fetch('https://graded-exercise-kidm.herokuapp.com/items/getAllItems')
            .then(response => response.json())
            .then(data => {
                dispatch(allActions.itemActions.setVisibleToFalse())
                setItemsData(data)
                // setDefaultData(data)
            })
            .catch(err => console.log(err))
    }, [trigger])
    useEffect(() => {
        if (searchWord.trim() !== '') {
            requestFunctions.searchRequest(`https://graded-exercise-kidm.herokuapp.com/items/searchBy${searchParam}?${searchParam.toLowerCase()}=${searchWord}`)
                .then(data => {
                    console.log(data)
                    setItemsData(data)

                })
                .catch(err => console.log(err))
        } else {
            dispatch(allActions.itemActions.setTrigger())

        }

    }, [searchWord])

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View
                style={{ backgroundColor: "#06566e", justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ProgressLoader
                    visible={visible}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
            </View>
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TouchableOpacity onPress={() => { }}>
                        <Entypo name="menu" size={30} color="#12A1D7" style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>
                    <TextInput
                        style={{ width: "80%", marginLeft: '10%', marginRight: 'auto' }}
                        placeholder={`Search here...`}
                        name="searchWord"
                        onChangeText={(searchWord) => setSearchWord(searchWord)}
                        value={searchWord}
                    />
                    <View>
                    {/* <Entypo name="menu" size={30} color="#12A1D7" style={{ paddingRight: 10, paddingTop: 10 }} /> */}
                    <Picker
                        style={{ height: 25, width: 25, alignSelf: "flex-end" }}
                        selectedValue={searchParam}
                        onValueChange={(value) =>
                            setSearchParam(value)
                        }>
                        <Picker.Item label="Search by location" value="Location" />
                        <Picker.Item label="Search by date" value="Date" />
                        <Picker.Item label="Search by category" value="Category" />
                    </Picker>
                    </View>
                </View>

                {(itemsData.length !== 0) ?
                    itemsData.map(element => {
                        return (
                            <ItemSmall key={element.id} data={element}></ItemSmall>
                        )
                    }) : <Text> No search results</Text>
                }
                {}
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
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: "center",
        flexDirection: "row",
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
    },
    searchBox: {
        alignItems: "center",
        height: 50,
        width: "98%",
        shadowColor: "#000",
        shadowOffset: {
            width: 15,
            height: 0,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.41,

        elevation: 2,
        borderRadius: 2,
        marginBottom: 15,
        flexDirection: "row"
    }
});

export default Home
