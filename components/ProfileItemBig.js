import React from 'react'
import allActions from '../src/actions'
import { View, Text, Image, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

const ProfileItemBig = (props) => {
    const data = props.route.params;
    const dispatch = useDispatch();
    const requestFunctions = require('./functions/requestsFunctions')
    const currentUser = useSelector(state => state.currentUser)
    const deleteItem = () => {
        Alert.alert(
            'Delete',
            `Are you sure to delete ${data.title}?`,
            [
              {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => {
                requestFunctions.authorizedDeleteRequest(`https://graded-exercise-kidm.herokuapp.com/items/${data.id}`, currentUser.token)
                .then(data => {
                    console.log('data: ', data);
                    props.navigation.navigate('Profile')
                    dispatch(allActions.itemActions.setTrigger())
                })
                .catch(err => console.log(err))
              }},
            ]
          );
    }
    return (<>
         <ScrollView style={{backgroundColor: '#fff'}}> 
          <View style={{ flex: 1, alignContent:"center"}}>
     
{(data.images.length !== 0 ? 
  <Image
            style={{ 
              height: 330,
              width: "100%",
              borderWidth: 1,
            }}
            source={{ uri: `${data.images[0]}` }}
            /> 
            :
            <Image
            style={{ width: "90%", height: 300, borderRadius: 4, alignSelf: "center", opacity: .5}}
            source={{ uri: 'https://avatars.mds.yandex.net/get-pdb/2058254/be318f4e-1810-439f-8e96-fdeda2a0dc2c/s1200' }}
            />
)}
            <View style={{marginHorizontal: 18, marginBottom: 30}}>   
                <Text style={{marginVertical: 2, fontSize: 30}}>{data.title}</Text>
                <Text style={{marginTop: 0, marginBottom: 20, fontSize: 30, fontWeight: "bold"}}>{data.price}€</Text>
                <View
                    style={{
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 0.5,
                    }}
                />
                <View style={styles.option}>
                <Text style={{color:'#000', opacity:.54}}>Location</Text>
                <Text>{data.location}</Text>
                </View>
                
                <View style={styles.option}>
                <Text style={{color:'#000', opacity:.54}}>Category</Text>
                <Text>{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</Text>
                </View>
                <View style={styles.option}>
                <Text style={{color:'#000', opacity:.54}}>Delivery</Text>
                <Text>{data.deliveryType.charAt(0).toUpperCase() + data.deliveryType.slice(1)}</Text>
                </View>
                <View style={styles.option}>
                <Text style={{color:'#000', opacity:.54}}>Contacts</Text>
                <Text style={{width: 100, textAlign: "right"}}>{data.contacts.charAt(0).toUpperCase() + data.contacts.slice(1)}</Text>
                </View>
                  <Text style={{fontSize: 18, width:"80%", marginTop: 5}}>{data.description}</Text>
          </View>
          </View>
          {
              (props.home !== true ?
              <View style={{flexDirection: "row", marginHorizontal: 10, marginBottom: 10}}>    
              <TouchableOpacity
              style={{      
                borderColor: 5,
                alignItems: 'center',
                backgroundColor: '#12A1D7',
                padding: 10,
                width: "50%",
              }}
              onPress={() => {props.navigation.navigate('EditItem',{...data})}}><Text style={{color:'white'}}>Edit</Text></TouchableOpacity>
              <TouchableOpacity  onPress={() => deleteItem()} style={{      
                    borderColor: 5,
                    alignItems: 'center',
                    backgroundColor: '#EE5E68',
                    padding: 10,
                    width: "50%",
    
              }}><Text style={{color:'white'}}>Delete</Text></TouchableOpacity>
              </View> 
              :
              <></>
              )
          }
          </ScrollView>
          </>
    )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: '80%'
  }
})

export default ProfileItemBig
