import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function RegistroScreen({navigation} : any) {
 
     const [nombre, setnombre] = useState("")
     const [password, setpassword] = useState("")
     const [email, setemail] = useState("")
     const [edad, setedad] = useState(0)
     
     async function registro(){
    const { data, error } = await supabase.auth.signUp({
     email: email,
    password: password,
})


if(data.user != null){
navigation.navigate("Login")
guardar( data.user.id)
}else{
    console.log(error);
      
      Alert.alert("Error", error?.message)
}


  }
 async function guardar(uid : string){
    const { error } = await supabase
  .from('usuario')
  .insert({ 
    uid : uid,
    nombre: nombre, 
    email : email,
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
 placeholder='Ingrese su nombre'
 style={styles.input}
 onChangeText={(texto)=> setnombre(texto) }
 value = {nombre}
    />
     <TextInput
 placeholder='Cree su contraseña'
 style={styles.input}
 onChangeText={(texto)=> setpassword(texto) }
 value = {password}
 
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
 onChangeText={(texto)=> setemail(texto) }
 value= {email}
      />
     
 
     <TouchableOpacity style = {styles.button} onPress={registro} >
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