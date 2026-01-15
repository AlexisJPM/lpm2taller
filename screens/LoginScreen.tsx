import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

        <View >
            <Text style={styles.text}>Registrar Juego</Text>
            </View>
      

  <TextInput
    placeholder='Ingresar ide'
style={styles.input}
onChangeText={(texto)=> setid(texto) }
value = {id}
  />
   <TextInput
placeholder='Ingrese su nombre'
style={styles.input}
onChangeText={(texto)=> setnombre(texto) }
value = {nombre}
   />
    <TextInput
placeholder='Cree su contraseña'
style={styles.input}
onChangeText={(texto)=> setcontrasenia(texto) }
value = {contrasenia}

    />
     <TextInput
placeholder='Ingresar su correo'
style={styles.input}
onChangeText={(texto)=> setcorreo(texto) }
value= {correo}
     />
       <TextInput
placeholder='Ingresar su edad'
style={styles.input}
onChangeText={(texto)=> setedad(+texto) }
value= {edad.toString()}
keyboardType='numeric'
     />

    <TouchableOpacity style = {styles.button} >
        <Text >Guardar</Text>
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
        borderRadius: 5
    },
    container: {
        justifyContent: "center",
        marginTop: 50,
        
    },
    text:{
        fontSize: 50,
        justifyContent : "center"
        
    },
    button:{
        borderRadius: 5,
        backgroundColor: "#1665f8",
        margin : 5,
        height: 50,
        
        justifyContent: "center",
    },
   })