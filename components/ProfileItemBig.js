import React from 'react'
import allActions from '../src/actions'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

const ProfileItemBig = (props) => {
    const data = props.route.params;
    const dispatch = useDispatch();
    const requestFunctions = require('./functions/requestsFunctions')
    const currentUser = useSelector(state => state.currentUser)
    const deleteItem = () => {
        requestFunctions.authorizedDeleteRequest(`https://graded-exercise-kidm.herokuapp.com/items/${data.id}`, currentUser.token)
        .then(data => {
            console.log('data: ', data);
            props.navigation.navigate('Profile')
            dispatch(allActions.itemActions.setTrigger())
        })
        .catch(err => console.log(err))
    }
    return (
        <View style={{ flex: 1, alignContent: "center", backgroundColor: "#fff" }}>
            <Text style={{ textAlign: "center", fontSize: 50 }}>{data.title}</Text>
            {(data.images.length !== 0 ?
                <Image
                    style={{
                        flex: 1,
                        marginHorizontal: 15,
                        alignSelf: 'stretch',
                        borderWidth: 1,
                        borderRadius: 5
                    }}
                    source={{ uri: `${data.images[0]}` }}
                />
                :
                <Image
                    style={{ width: "90%", height: 300, borderRadius: 4, alignSelf: "center" }}
                    source={{ uri: 'https://avatars.mds.yandex.net/get-pdb/2058254/be318f4e-1810-439f-8e96-fdeda2a0dc2c/s1200' }}
                />
            )}
            <View style={{ marginHorizontal: 18, marginBottom: 30 }}>
                <Text style={{ marginVertical: 5 }}>{data.description}</Text>
                <Text style={{ marginVertical: 5 }}>Contacts: {data.contacts}</Text>
                <Text style={{ marginVertical: 5 }}>Price: <Text>{data.price}</Text>$</Text>
            </View>
            <View style={{}}>
                <Button title="Edit item" onPress={() => {props.navigation.navigate('EditItem',{...data})}}/>
                <Text></Text>
                <Button title="Delete Item" onPress={() => deleteItem()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})
export default ProfileItemBig
