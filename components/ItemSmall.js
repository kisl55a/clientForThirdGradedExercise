import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ItemSmall = (props) => {
    return (
  <View style={styles.box}>
        <Image
            style={{ width: 150, height: 150, borderRadius: 4, }}
            source={{ uri: 'https://avatars.mds.yandex.net/get-pdb/2058254/be318f4e-1810-439f-8e96-fdeda2a0dc2c/s1200' }}
        />
        <View style={styles.itemText}>
            <Text style={{fontSize: 40, textAlign:"center", width: 150}}>Yamaha</Text>
            <Text style={{fontSize: 30, fontWeight: "bold", textAlign:"center"}}> 3500$</Text>
        </View>
    </View>
      
    )
}

const styles = StyleSheet.create({

    box: {
        width: "95%",
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
