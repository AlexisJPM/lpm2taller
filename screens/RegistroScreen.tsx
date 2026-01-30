
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'
import Avatars from '../components/Avatars'
import { decode } from 'base64-arraybuffer'
import { File, Directory, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function RegistroScreen({ navigation }: any) {

  const [nombre, setnombre] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [edad, setedad] = useState(0)
  const [avatar, setavatar] = useState<string | null>(null);

  async function registro() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (data.user) {
      // Aquí pasamos el UID como parámetro a tus otras funciones
      await subirImagen(data.user.id);
      await guardar(data.user.id);

      navigation.navigate("Login");
    } else {
      Alert.alert("Error", error?.message);
    }

  }

  async function guardar(uid: string) {
    // Generar la URL pública basándose en la ruta que usamos en subirImagen
    const { data: publicUrlData } = supabase.storage
      .from('Avatar')
      .getPublicUrl(`usuario/${uid}.png`);

    const { error } = await supabase
      .from('usuario')
      .insert({
        uid: uid,
        nombre: nombre,
        email: email,
        edad: edad,
        avatar: publicUrlData.publicUrl // Guardamos la URL de internet, no la del celular
      });

    if (error) console.log("Error al guardar perfil:", error.message);
  }
  /////////imagen ///////////////////////////////////
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();


    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setavatar(result.assets[0].uri);
    }
  };

  ////////SUBIR IMAGEN A STORAGE/////////////


  async function subirImagen(uid: string) {

    if (!avatar) {
      return false
    }
    //CREAR UNA INSTANCIA DE LA IMAGEN

    const file = new File(avatar)

    //transformar a matriz de bits
    const matrizBits = await file.bytes()
    const { data, error } = await supabase
      .storage
      .from('Avatar')
      .upload(`usuario/${uid}.png`, matrizBits, {
        contentType: 'image/png'
      })

    console.log(data);
    console.log(error);

  }

  const camara = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setavatar(result.assets[0].uri);
    }
  };


  return (
    <View
      style={styles.container}>
      <View style={styles.avatarBoton}  >
        <Avatars uri={avatar} size={150} />
      </View>

      <TouchableOpacity style={styles.avatarBoton} onPress={pickImage}>
        <Text style={styles.botonSimple}>Subir imagen</Text>
      </TouchableOpacity>
      <View >
        <TouchableOpacity style={styles.avatarBoton} onPress={camara}>
          <Text style={styles.botonSimple2}>Abrir camara</Text>
          {avatar && <Image source={{ uri: avatar }} style={styles.avatarBoton} />}
        </TouchableOpacity>
        <View ></View>


        <Text style={styles.text}>Registro de Usuario</Text>
      </View>

      <TextInput
        placeholder='Ingrese su nombre'
        style={styles.input}
        onChangeText={(texto) => setnombre(texto)}
        value={nombre}
      />
      <TextInput
        placeholder='Ingresar su edad'
        style={styles.input}
        onChangeText={(texto) => setedad(+texto)}
        value={edad.toString()}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Cree su contraseña'
        style={styles.input}
        onChangeText={(texto) => setpassword(texto)}
        value={password}


      />
      <TextInput
        placeholder='Ingresar su correo'
        style={styles.input}
        onChangeText={(texto) => setemail(texto)}
        value={email}
      />


      <TouchableOpacity style={styles.button} onPress={() => registro()} >
        <Text style={{ fontSize: 20, fontFamily: 'juego' }}>Guardar</Text>
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
    margin: 20,
    fontFamily: 'juego'
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
  },
  avatarBoton: {
    alignItems: "center",
    marginBottom: 16
  },
  botonSimple: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  botonSimple2: {
    backgroundColor: '#21f321',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
})