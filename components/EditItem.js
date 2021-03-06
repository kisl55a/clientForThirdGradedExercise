import React, { useState } from 'react'
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../src/actions'

const EditItem = (props) => {
    const dispatch = useDispatch()
    const data = props.route.params;
    const token = useSelector(state => state.currentUser.token)
    const requestFunctions = require('./functions/requestsFunctions')
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [location, setLocation] = useState(data.location);
    const [category, setCategory] = useState(data.category);
    const [price, setPrice] = useState(`${data.price}`);
    const [deliveryType, setDeliveryType] = useState(data.deliveryType)
    const [contacts, setContacts] = useState(data.contacts);
    const [postFormToSend, setPostFormToSend] = useState(new FormData());
    const [photos, setPhotos] = useState([]);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        console.log("photos :", photos)
        if (photos.length > 3) {
            alert('To many photos')
        } else {
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if (pickerResult.cancelled == true) {
                dispatch(allActions.itemActions.setVisibleToFalse())
                return;
            }
            const fileNameSplit = pickerResult.uri.split('/');
            const fileName = fileNameSplit[fileNameSplit.length - 1];
            dispatch(allActions.itemActions.setVisibleToTrue())
            await setPhotos(photos.concat([{
                uri: pickerResult.uri,
                name: fileName,
                type: 'image/jpeg'
            }]))
            dispatch(allActions.itemActions.setVisibleToFalse())
        }
    }
    const sendData = async () => {
        if (title.trim() !== '' &&
            description.trim() !== '' &&
            location.trim() !== '' &&
            price.trim() !== '' &&
            deliveryType.trim() !== '' &&
            price.trim() !== '' &&
            contacts.trim() !== '') {
                if(photos.length !== 0){
                    for (let i = 0; i < photos.length; i++) {
                        await postFormToSend.append('images', {
                             uri: photos[i].uri,  
                             name: photos[i].name,
                             type: 'image/jpeg'
                         })
                     }
                }
                let day = new Date().toISOString().slice(8, 10)
                let mounth = new Date().toISOString().slice(5, 7)
                let year = new Date().toISOString().slice(0,4)
                let date = `${day}.${mounth}.${year}`
            dispatch(allActions.itemActions.setVisibleToTrue());
            postFormToSend.append("title", title)
            postFormToSend.append("description", description)
            postFormToSend.append("location", location)
            postFormToSend.append("category", category)
            postFormToSend.append("price", price)
            postFormToSend.append("deliveryType", deliveryType)
            postFormToSend.append("contacts", contacts)
            postFormToSend.append('date', date)
            requestFunctions.editItem(`https://graded-exercise-kidm.herokuapp.com/items/${data.id}`, token, postFormToSend)
                .then(res => {
                    console.log(res)
                    dispatch(allActions.itemActions.setTrigger())
                    dispatch(allActions.itemActions.setVisibleToFalse())
                    props.navigation.navigate('Profile')
                })
                .catch(err => {
                    console.log('err: ', err);
                    setPostFormToSend(new FormData())
                    Alert.alert('Failed')
                    dispatch(allActions.itemActions.setVisibleToFalse())
                    props.navigation.navigate('Profile')
                })

        } else {
            Alert.alert('Fill all the input fields')
        }

    }

    return (
        <ScrollView style={{
        backgroundColor: '#fff',
        }}>

        <View style={styles.container}>
            <TextInput
                name="title"
                placeholder="Title"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(title) => setTitle(title)}
                value={title}
            />
            <TextInput
                name="description"
                placeholder="Description"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(description) => setDescription(description)}
                value={description}
            />
            <TextInput
                name="location"
                placeholder="Location"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(location) => setLocation(location)}
                value={location}
            />
           <TextInput
                name="category"
                placeholder="Category"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(category) => { setCategory(category) }}
                value={category}
            />
            <TextInput
                keyboardType={'numeric'}
                name="price"
                placeholder="0"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(price) => setPrice(price)}
                value={price}
            />
            <Picker
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}

                selectedValue={deliveryType}
                onValueChange={(itemValue) =>
                    setDeliveryType(itemValue)
                }>
                <Picker.Item label="PickUp" value="Pickup" />
                <Picker.Item label="Delivery" value="Delivery" />
            </Picker>
            <TextInput
                name="contacts"
                placeholder="Contacts"
                style={{ height: 35, textAlign: "center", width: "90%", fontSize: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 3, marginBottom: 15 }}
                onChangeText={(contacts) => setContacts(contacts)}
                value={contacts}
            />
             <View style={{ flexDirection: "row" }}>
                    {photos.map((image, id) => {
                        return <Image source={{ uri: image.uri }} key={id} style={{ width: 75, height: 75, marginHorizontal: 5 }} />
                    })}
                </View>
            <TouchableOpacity onPress={() => openImagePickerAsync()} style={{
                borderWidth: 1,
                borderColor: 5,
                alignItems: 'center',
                backgroundColor: 'gray',
                padding: 10,
                marginTop: 10,
                width: "90%",
                borderRadius: 3,
                marginBottom: 10
                 }}>
                <Text style={{color:"white"}}>Pick a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 5,
                    alignItems: 'center',
                    backgroundColor: '#009d00',
                    padding: 10,
                    width: 150,
                    borderRadius: 5,
                    marginBottom: 10
                }}
                onPress={() => sendData()}>
                <Text style={{ color: "white" }}>Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 5,
                    alignItems: 'center',
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    borderRadius: 5,
                    width: 150,
                    marginBottom: 10
                }}
                onPress={() => props.navigation.navigate('Profile')}>
                <Text>Back</Text>
            </TouchableOpacity>

        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
})
export default EditItem
