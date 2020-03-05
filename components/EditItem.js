import React, { useState } from 'react'
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native'
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

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled == true) {
            alert('Image picker cancelled or failed');
            return;
        }

        const fileNameSplit = pickerResult.uri.split('/');
        const fileName = fileNameSplit[fileNameSplit.length - 1];

        let postForm = new FormData();
        postForm.append('images', {
            uri: pickerResult.uri,
            name: fileName,
            type: 'image/jpeg'
        });
        setPostFormToSend(postForm)
    }
    const sendData = () => {
        if (title.trim() !== '' &&
            description.trim() !== '' &&
            location.trim() !== '' &&
            price.trim() !== '' &&
            deliveryType.trim() !== '' &&
            price.trim() !== '' &&
            contacts.trim() !== '') {
            dispatch(allActions.itemActions.setVisibleToTrue());
            postFormToSend.append("title", title)
            postFormToSend.append("description", description)
            postFormToSend.append("location", location)
            postFormToSend.append("category", category)
            postFormToSend.append("price", price)
            postFormToSend.append("deliveryType", deliveryType)
            postFormToSend.append("contacts", contacts)
            postFormToSend.append('date', new Date().toISOString().slice(0, 10))
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
                    props.navigation.navigate('Profile')
                })

        } else {
            Alert.alert('Fill all the input fields')
        }

    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20, color: "red" }}>{}</Text>
                <Text>Title</Text>
                <TextInput
                    name="title"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(title) => setTitle(title)}
                    value={title}
                />

                <Text>Description</Text>
                <TextInput
                    name="description"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(description) => setDescription(description)}
                    value={description}
                />
                <Text>Location</Text>
                <TextInput
                    name="location"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(location) => setLocation(location)}
                    value={location}
                />
                <Text>Category</Text>
                <TextInput
                    name="category"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(category) => { setCategory(category) }}
                    value={category}
                />
                <Text>Price</Text>
                <TextInput
                    keyboardType={'numeric'}
                    name="price"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(price) => setPrice(price)}
                    value={price}
                />
                <Text>Delivery type</Text>
                <Picker
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}

                    selectedValue={deliveryType}
                    onValueChange={(itemValue) =>
                        setDeliveryType(itemValue)
                    }>
                    <Picker.Item label="PickUp" value="Pickup" />
                    <Picker.Item label="Delivery" value="Delivery" />
                </Picker>

                <Text>Contacts</Text>
                <TextInput
                    name="password"
                    style={{ height: 25, width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15 }}
                    onChangeText={(contacts) => setContacts(contacts)}
                    value={contacts}
                />
                <Text>Photos</Text>
                <TouchableOpacity onPress={() => openImagePickerAsync()} style={{ borderWidth: 1, borderColor: 'black' }}>
                    <Text>Pick a photo</Text>
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
                    onPress={() => { }}>
                    <Text>Login</Text>
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
