import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import Avatars from '../components/Avatars';
import * as ImagePicker from 'expo-image-picker';


export default function PerfilScreen({ navigation }: any) {
  const [loaded, error] = useFonts({
    'juego': require('../assets/fonts/Butterpop.otf'),
  });
 
  const [user, setuser] = useState({} as usuario)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
  if (user?.avatar) {
    const { data } = supabase.storage
      .from('Avatar')
      .getPublicUrl(user.avatar)

    setImageUrl(data.publicUrl)
  }
}, [user.avatar])

  type usuario = {
    nombre: String,
    edad: number,
    email: string,
    avatar: string
  }

  useEffect(() => {
    leerUser()
  }, [])

  async function leerUser() {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) {
      datosUser(data.session.user.id)
    }
  }

  async function datosUser(uid: any) {
    const { data, error } = await supabase
      .from('usuario')
      .select()
      .eq('uid', uid)

    if (data && data.length > 0) {
      setuser(data[0])
    }
  }

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut()
    await SecureStore.deleteItemAsync('token')

    navigation.navigate("Home")
  }

 function url(){
  const { data } = supabase.storage
  .from('Avatar')
  .getPublicUrl(user.avatar)

const imageUrl = data.publicUrl
 }
  
    
  
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Perfil de Jugador</Text>

 <View >
 {imageUrl && (
  <Image
    source={{ uri: imageUrl }}
    style={{ width: 120, height: 120, borderRadius: 60 }}
  />
)}
                    </View>
       

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.nombre}</Text>
        </View>


        <View style={styles.row}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{user.edad} años</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>SALIR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55776C',
    padding: 24,
  },
  title: {
    fontSize: 30,
    color: '#C5A059',
    marginTop: 40,
    textAlign: 'center',
    fontFamily: 'juego'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  card: {
    backgroundColor: "#7EA296",
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
  label: {
    width: 95,
    fontFamily: 'juego',
    fontSize:20,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#333',
    fontSize: 18,
    fontFamily: 'juego',
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: "#d7615a",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C5A059',
  },
  logoutText: {
    fontSize: 20,
    fontFamily: 'juego',
  },
  avatarBoton: {
      alignItems: "center",
      marginBottom: 16
    },
    
})
