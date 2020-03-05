import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ItemSmall from './ItemSmall'
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressLoader from 'rn-progress-loader';
import allActions from '../src/actions'


const Home = () => {
    const [itemsData, setItemsData] = useState([])
    const dispatch = useDispatch();
    const visible = useSelector(state => state.currentItem.visible)
    const trigger = useSelector(state => state.currentItem.trigger)
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

    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
              <View
                style={{backgroundColor: "#06566e", justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ProgressLoader
                visible={visible}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </View>
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
