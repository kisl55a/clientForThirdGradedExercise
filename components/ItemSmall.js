import React from 'react'
import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ItemPage from './ItemPage'

const ItemSmall = (props) => {
    const [togglePopUp, setTogglePopUp] = useState(false)

    return (
        <TouchableOpacity style={{ width: "100%", paddingHorizontal: 5 }} onPress={() => setTogglePopUp(!togglePopUp)} >
            <View style={styles.box} >
                <ItemPage data={props.data} togglePopUp={togglePopUp} setTogglePopUp={setTogglePopUp}></ItemPage>
                {(props.data.images.length == 0 ? <Image
                    style={{ width: 150, height: 150, borderRadius: 4 }}
                    source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcrime-families.fandom.com%2Fwiki%2FHiram_Lance%2527s_Father&psig=AOvVaw2TnUZI-Td0FGFC6nDGJxLV&ust=1582642884165000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIC656m66ucCFQAAAAAdAAAAABAO' }}
                /> :
                    <Image
                        style={{ flex: 1, width: 150, height: 150, borderRadius: 4 }}
                        source={{ uri: `${props.data.images[0]}` }}
                    />)}
                <View style={styles.itemText}>
                    <Text style={{ fontSize: 30, textAlign: "center", width: 150 }}>{(props.data.title)}</Text>
                    <Text style={{ fontSize: 30, textAlign: "center", fontWeight:"700"}}>{props.data.price}€</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", width: 150 }}>{(props.data.location)}</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", width: 150, fontWeight:"300" }}>{(props.data.date)}</Text>


                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({

    box: {
        backgroundColor: "#fff",
        width: "100%",
        marginVertical: 5,
        height: "auto",
        borderRadius: 4,
        borderWidth: 0.8,
        borderColor: '#d6d7da',
        alignItems: "center",
        flexDirection: "row",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 15,
        //     height: 15,
        // },
        // shadowOpacity: 0.10,
        // shadowRadius: 1.41,s

        // elevation: 1,
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
    }
});
export default ItemSmall
