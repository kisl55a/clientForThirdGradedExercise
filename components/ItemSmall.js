import React from 'react'
import {useState} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity   } from 'react-native'
import ItemPage from './ItemPage'

const ItemSmall = (props) => {
    const [togglePopUp, setTogglePopUp] = useState(false)

    return (
    <TouchableOpacity style={{width: "100%", paddingHorizontal: 5}}  onPress={() => setTogglePopUp(!togglePopUp)} >
  <View style={styles.box} >
      <ItemPage title="da" togglePopUp={togglePopUp} setTogglePopUp={setTogglePopUp}></ItemPage>
        <Image
            style={{ width: 150, height: 150, borderRadius: 4, }}
            source={{ uri: 'https://avatars.mds.yandex.net/get-pdb/2058254/be318f4e-1810-439f-8e96-fdeda2a0dc2c/s1200' }}
        />
        <View style={styles.itemText}>
            <Text style={{fontSize: 40, textAlign:"center", width: 150}}>Yamaha</Text>
            <Text style={{fontSize: 30, fontWeight: "bold", textAlign:"center"}}> 3500$</Text>
        </View>
    </View>
    </TouchableOpacity >
    )
}

const styles = StyleSheet.create({

    box: {
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
