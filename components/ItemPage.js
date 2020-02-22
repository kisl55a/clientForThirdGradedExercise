import React from 'react'
import { View, Text, Button } from 'react-native'
import Modal from "react-native-modal";

const ItemPage = (props) => {
    return (
        <Modal isVisible={props.togglePopUp} style={{flex: 1,backgroundColor: "white", height: "90%", width: "100%", margin: 0}} animationIn='slideInUp'>
          <View style={{ flex: 1, alignContent:"center", justifyContent:"center",}}>
                <Text>I am the modal content!{props.title}</Text>
                <Button onPress={() => {props.setTogglePopUp(!props.togglePopUp)}} title="Back"></Button>
          </View>
        </Modal>
    )
}

export default ItemPage
