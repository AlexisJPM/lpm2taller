import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


export default function HomeScreen(  {navigation} : any  ) {
  return (
    
    <ImageBackground style={styles.container} source={{uri : "https://i.postimg.cc/Jzm2T07J/06-55-58-480-512.gif"}}>
      
      <Text style={{color: 'white', fontSize: 40}}>Bienvenido</Text>

    <TouchableOpacity onPress={()=> navigation.navigate("Login")}
      style = {styles.btnLocal}
      >
      <Text style={{fontSize: 30}}>Login</Text>
      
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> navigation.navigate("Registro")}
      style = {styles.btnExterno}
      >

        <Text style={{fontSize : 30}}>Registarse</Text>

    </TouchableOpacity>

    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({

  imgLocal :{
    height:60,
    width : 60
  },
  btnLocal:{
    backgroundColor : "#f8060662",
    height: 85,
    width : "50%",
    flexDirection:"row",
    borderRadius: 15,
    alignItems :'center',
    justifyContent : 'center',
    margin:20,
  },
  imgExterno:{
    height:60,
    width : 60
  },
  btnExterno:{
    backgroundColor : "#11c9399c",
    height: 85,
    width : "50%",
    flexDirection:"row",
    borderRadius: 15,
    alignItems :'center',
    justifyContent : 'center',
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})