import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import Avatars from '../components/Avatars';
import { useFocusEffect } from '@react-navigation/native';

export default function PerfilScreen({ navigation }: any) {
  const [loaded] = useFonts({
    'juego': require('../assets/fonts/Butterpop.otf'),
  });

  const [user, setUser] = useState<any>(null);

 
  useFocusEffect(
    // Es vital envolver la lógica en useCallback para evitar bucles infinitos
    useCallback(() => {
      leerUser();
    }, [])
  );

  async function leerUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      datosUser(session.user.id);
    }
  }

  async function datosUser(uid: any) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('nombre, edad, email, avatar, scores') 
        .eq('uid', uid)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    await SecureStore.deleteItemAsync('token');
    navigation.navigate("Home");
  }

  if (!user || !loaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#C5A059" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Jugador</Text>

      <View style={styles.imageContainer}>
        <Avatars 
          uri={user.avatar} 
          size={140} 
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

        <View style={[styles.row, { borderBottomWidth: 0, marginBottom: 0 }]}>
          <Text style={styles.label}>Puntos:</Text>
          <Text style={[styles.value, { color: '#C5A059', fontSize: 22 }]}>
            {user.scores || 0} pts
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>SALIR</Text>
      </TouchableOpacity>
    </View>
  );
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
    fontSize: 20,
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
    color: 'white'
  },
});