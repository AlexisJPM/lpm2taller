import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { supabase } from '../supabase/config'
import { useFocusEffect } from '@react-navigation/native';
import Scores from '../components/Scores';
import { useFonts } from 'expo-font';

export default function ScoreScreen() {

  const [loaded, fontError] = useFonts({
    'juego': require('../assets/fonts/Butterpop.otf'),
  });

  const [puntajes, setpuntajes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      obtenerDatos();
    }, [])
  );


  async function obtenerDatos() {
    const { data, error } = await supabase
      .from('usuario')
      .select('nombre, scores, uid');

    if (error) {
      console.error("Error:", error);
      return;
    }

    if (data) {
      const lista = data.map((user) => ({
        id: user.uid,
        nombre: user.nombre || 'Jugador Anónimo',
        puntos: Number(user.scores) || 0,
      }))
        .sort((a, b) => b.puntos - a.puntos); // Ordenamos de mayor a menor

      setpuntajes(lista);
    }
  }

  if (!loaded && !fontError) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Score Global</Text>
      <FlatList
        data={puntajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Scores
            item={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55776C',
    padding: 24,
  },
  titulo: {
    color: '#C5A059',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'juego',
  }
});