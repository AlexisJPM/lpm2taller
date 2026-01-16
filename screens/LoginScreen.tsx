import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen() {
 const [id, setid] = useState("")
    const [nombre, setnombre] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [correo, setcorreo] = useState("")
    const [edad, setedad] = useState(0)
    


  return (
    <View 
    style={styles.container}>

<Image style={styles.usuario} source={{uri : "https://i.postimg.cc/7hQwDzBS/perfil-del-usuario.png"}}/>
        <View >
            <Text style={styles.text}>Login</Text>
            </View>
      

  <TextInput
    placeholder='Ingrese su correo'
style={styles.input}
onChangeText={(texto)=> setcorreo(texto) }
value = {id}
  />
   <TextInput
placeholder='Ingrese su contraseña'
style={styles.input}
onChangeText={(texto)=> setcontrasenia(texto) }
value = {nombre}
   />

    <TouchableOpacity style = {styles.button} >
        <Text >Ingresar</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    input:{
        backgroundColor: "#fdfdfd",
        fontSize: 12,
        margin: 5,
        height: 50,
        width: 300,
        borderRadius: 5
    },
    container: {
      
    justifyContent: 'center',
    alignItems: 'center',
        
    },
    text:{
        fontSize: 50,
        justifyContent : "center"
        
    },
    button:{
        backgroundColor : "#0051ffa1",
    height: 50,
    width : "50%",
    flexDirection:"row",
    borderRadius: 15,
    alignItems :'center',
    justifyContent : 'center'
    },
    usuario:{
      width: 145,
      height: 150,
      marginTop: 50
    }
   })