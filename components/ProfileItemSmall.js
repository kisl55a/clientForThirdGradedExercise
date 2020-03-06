import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const ItemSmall = (props) => {

    return (
        <TouchableOpacity style={{ width: "100%", paddingHorizontal: 5 }} onPress={() => {props.navigation.navigate('Item',{...props.data})}} >
            <View style={styles.box}>
                    <Image
                        style={{ width: 150, height: 150, borderRadius: 4 }}
                        source={{ uri: `${props.data.images[0]}` }}
                    />
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
        marginVertical: 10,
        height: "auto",
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: "center",
        flexDirection: "row",
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
    }
});
export default ItemSmall
