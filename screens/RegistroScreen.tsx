import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function RegistroScreen() {
 const [cedula, setcedula] = useState("")
     const [nombre, setnombre] = useState("")
     const [contrasenia, setcontrasenia] = useState("")
     const [correo, setcorreo] = useState("")
     const [edad, setedad] = useState(0)
     
 async function guardar(){
    const { error } = await supabase
  .from('usuario')
  .insert({ 
    cedula: cedula,
    nombre: nombre, 
    contrasenia: contrasenia ,
    correo: correo,
    edad: edad
    })
    console.log(error);
    
  }
 
   return (
     <View 
     style={styles.container}>
 
 <Image style={styles.usuario} source={{uri : "https://i.postimg.cc/7hQwDzBS/perfil-del-usuario.png"}}/>
         <View >
             <Text style={styles.text}>Registro de Usuario</Text>
             </View>
       
 
   <TextInput
     placeholder='Ingresar su cedula'
 style={styles.input}
 onChangeText={(texto)=> setcedula(texto) }
 value = {cedula}
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
 placeholder='Ingresar su edad'
 style={styles.input}
 onChangeText={(texto)=> setedad(+texto) }
 value= {edad.toString()}
 keyboardType='numeric'
      />
      <TextInput
 placeholder='Ingresar su correo'
 style={styles.input}
 onChangeText={(texto)=> setcorreo(texto) }
 value= {correo}
      />
     
 
     <TouchableOpacity style = {styles.button} onPress={guardar} >
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