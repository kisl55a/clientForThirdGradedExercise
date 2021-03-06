import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Picker, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProfileItemSmall from './ProfileItemSmall'
import { Entypo } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressLoader from 'rn-progress-loader';
import allActions from '../src/actions'


const Home = (props) => {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.currentItem.visible);
    const trigger = useSelector(state => state.currentItem.trigger);
    const requestFunctions = require('./functions/requestsFunctions');
    const [itemsData, setItemsData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [searchParam, setSearchParam] = useState('location');




    useEffect(() => {
        dispatch(allActions.itemActions.setVisibleToTrue())
        fetch('https://graded-exercise-kidm.herokuapp.com/items/getAllItems')
            .then(response => response.json())
            .then(data => {
                dispatch(allActions.itemActions.setVisibleToFalse())
                setItemsData(data)
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
                        style={{ width: "90%", marginLeft: '10%', marginRight: 'auto' }}
                        placeholder={`Search here...`}
                        name="searchWord"
                        onChangeText={(searchWord) => setSearchWord(searchWord)}
                        value={searchWord}
                    />
                    <View>
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
              <View>
                {(itemsData.length !== 0) ?
                    itemsData.map(element => {
                        return (
                            <ProfileItemSmall {...props} key={element.id} data={element}></ProfileItemSmall>
                        )
                    }) : <Text> No search results</Text>
                }
                </View>  

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
    },
    searchBox: {
        alignSelf: "center",
        alignItems: "center",
        height: 50,
        width: "98%",
        marginHorizontal: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 15,
            height: 15,
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
