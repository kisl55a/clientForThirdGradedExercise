import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import ProfileItemSmall from './ProfileItemSmall'
import allActions from '../src/actions/index'
const requestFunctions = require('./functions/requestsFunctions');



const Profile = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const trigger = useSelector(state => state.currentItem.trigger)
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([])
    useEffect(() => {
        requestFunctions.authorizedGetRequest('https://graded-exercise-kidm.herokuapp.com/items/', currentUser.token)
            .then(data => {
                setItemsData(data)
            })
            .catch(err => console.log(err))
    }, [trigger])
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>

            <View style={styles.container}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", alignItems: "center", marginLeft: "5%" }}>

                    <View>
                        <Text style={{ fontSize: 40, fontWeight: "800" }}>
                            {currentUser.username}
                        </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('CreateNewItem')}>
                            <Text style={{ fontSize: 20, color: "#12A1D7" }}>Add new item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(allActions.userActions.setUser({
                            username: '',
                            token: ''
                        }))}>
                            <Text style={{ fontSize: 20, color: "#12A1D7" }}>Logout</Text>
                        </TouchableOpacity>

                    </View>
                    <Image
                        source={{ uri: "https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png", width: 100, height: 100 }}
                    />
                </View>
                <View
                    style={{
                        paddingVertical: 10,
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 0.5,
                    }}
                />
                {(itemsData.length == 0 ? 
                 <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: "3%", marginTop: 10 }}>
                 You have nothing on sell now 
                     </Text>
                     :
                     <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: "3%", marginTop: 10 }}>
                     On sell now:
                         </Text>
                )}
             
                {itemsData.map(element => {
                    return (
                        <ProfileItemSmall {...props} key={element.id} data={element}></ProfileItemSmall>
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
        // alignItems: "center"
    },

})

export default Profile
