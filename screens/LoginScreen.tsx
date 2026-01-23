import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function LoginScreen({navigation} : any) {
  const [password, setpassword] = useState("")
       const [email, setemail] = useState("")

async function login(){
  const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})
if(data.session != null){
  
  navigation.navigate("BottonTab")
}else{
  console.log(error);
  
  Alert.alert("Error", error?.message)
}
}
  return (
    <View
      style={styles.container}>

      <Image style={styles.usuario} source={{ uri: "https://i.postimg.cc/7hQwDzBS/perfil-del-usuario.png" }} />
      <View >
        <Text style={styles.text}>Login</Text>
      </View>


      <TextInput
        placeholder='Ingrese su correo'
        style={styles.input}
        onChangeText={(texto) => setemail(texto)}
        value={email}
      />
      <TextInput
        placeholder='Ingrese su contraseña'
        style={styles.input}
        onChangeText={(texto) => setpassword(texto)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={() => login()} >
        <Text >Ingresar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  input: {
    backgroundColor: "#7EA296",
    borderColor: '#C5A059',
    fontSize: 15,
    margin: 5,
    height: 50,
    width: "80%",
    borderRadius: 7,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#55776C',
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 25,
    justifyContent: "center",
    margin: 20

  },
  button: {
    backgroundColor: "#A6CCBD",
    height: 50,
    width: "50%",
    flexDirection: "row",
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  usuario: {
    width: 145,
    height: 150,
    marginTop: 50
  }
})