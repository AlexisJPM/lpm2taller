import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'

export default function ScoreScreen({ navigation }: any) {
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
      .from('usuario') // Verifica si es 'jugador' o 'juador' en tu DB
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
      <Text style={styles.title}>Mejores puntuaciones</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Score:</Text>
          <Text style={styles.value}>{user.nombre}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.nombre}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{user.edad} años</Text>
        </View>
      </View>
      

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
    margin: 30,
    textAlign: 'center',
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
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '700',
  },
})