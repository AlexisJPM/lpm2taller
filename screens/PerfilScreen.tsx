import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'

export default function PerfilScreen({ navigation }: any) {
  const [user, setuser] = useState({} as usuario)

  type usuario = {
    nombre: String,
    edad: number,
    email: string
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
<<<<<<< HEAD
      .from('juador')
=======
      .from('usuario') 
>>>>>>> 71ad2d33fabda83ca1d77b51a99e8ff4c2b8fdf9
      .select()
      .eq('uid', uid)

    if (data && data.length > 0) {
      setuser(data[0])
    }
  }

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigation.navigate("Login")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Jugador</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.img}
          source={{ uri: "https://i.postimg.cc/NG4L2FNx/selfie.png" }}
        />
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
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#C5A059',
    marginTop: 40,
    textAlign: 'center',
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
    fontWeight: '700',
    width: 90,
  },
  value: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontWeight: '500'
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
    fontSize: 16,
    fontWeight: '700',
  },
})