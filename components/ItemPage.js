import React from 'react'
import { View, Text, Button, Image } from 'react-native'
import Modal from "react-native-modal";

const ItemPage = (props) => {
    return (
        <Modal isVisible={props.togglePopUp} style={{flex: 1, backgroundColor: "white", height: "100%", width: "100%", margin: 0}} animationIn='slideInUp'>
          <View style={{ flex: 1, alignContent:"center"}}>
          <Text style={{ textAlign: "center", fontSize: 50}}>{props.data.title}</Text>
{(props.data.images.length !== 0 ? 
  <Image
            style={{  flex: 1,
              marginHorizontal: 15,
              alignSelf: 'stretch',
              borderWidth: 1,
              borderRadius: 5
            }}
            source={{ uri: `${props.data.images[0]}` }}
            /> 
            :
            <Image
            style={{ width: "90%", height: 300, borderRadius: 4, alignSelf: "center" }}
            source={{ uri: 'https://avatars.mds.yandex.net/get-pdb/2058254/be318f4e-1810-439f-8e96-fdeda2a0dc2c/s1200' }}
            />
)}
            <View style={{marginHorizontal: 18, marginBottom: 30}}>      
                <Text style={{marginVertical: 5}}>{props.data.description}</Text>
                <Text style={{marginVertical: 5}}>Contacts: {props.data.contacts}</Text>
                <Text style={{marginVertical: 5}}>Price: <Text>{props.data.price}</Text>$</Text>
                <Button onPress={() => {props.setTogglePopUp(!props.togglePopUp)}} title="Back"></Button>
          </View>
          </View>
        </Modal>
    )
}

export default ItemPage
