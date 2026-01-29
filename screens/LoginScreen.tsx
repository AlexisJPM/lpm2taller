import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({navigation} : any) {
 const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
   tokenValido()
  }, [])
  

  async function login(){
  const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})

if(data.session != null){
  //2. ejecutar funcion para guardar token
  loginExitoso( data.session.access_token)
  navigation.navigate("BottonTab")
}else{
  console.log(error);
  
  Alert.alert("Error", error?.message)
}
}

//ACCESO MEDIANTE BIOMETRIA
  async function biometria(){
  const resultadoAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: "PON TU HUELLA EN EL LECTOR"
  })

  if ( resultadoAuth.success ){
    console.log("Login biometrico exitosos");
    navigation.navigate("BottonTab")
    
  }else{
    console.log("error biometrico");
    
  }
}

//1. VERIFICAR SI EL TOKEN ESTA ACTIVO Y SE GUARDA ENN UNA VARIABLE LOCAL
  async function loginExitoso( token : any){
 await SecureStore.setItemAsync("token", token)
}
//3. pedir login biometrico solo  ssi el token es valido

  async function tokenValido(){
  const token =await SecureStore.getItemAsync('token')
console.log(token);

  if( !token){
    return false;
  }
  biometria()
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
        keyboardType="email-address"
        style={styles.input}
        onChangeText={(texto) => setemail(texto)}
        value={email}
      />
      <TextInput
        placeholder='Ingrese su contraseña'
        secureTextEntry
        style={styles.input}
        onChangeText={(texto) => setpassword(texto)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={() => login()} >
        <Text style={{fontSize: 20, fontFamily:'juego'}}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    margin: 20,
    fontFamily:'juego'

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