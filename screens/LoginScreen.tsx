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

      <Image style={styles.usuario} source={{ uri: "https://i.postimg.cc/7hQwDzBS/perfil-del-usuario.png" }} />
      <View >
        <Text style={styles.text}>Login</Text>
      </View>


      <TextInput
        placeholder='Ingrese su correo'
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
        value={id}
      />
      <TextInput
        placeholder='Ingrese su contraseña'
        style={styles.input}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={nombre}
      />

      <TouchableOpacity style={styles.button} >
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