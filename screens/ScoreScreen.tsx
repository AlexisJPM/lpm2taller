import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { supabase } from '../supabase/config'
import { useFocusEffect } from '@react-navigation/native';
import Scores from '../components/Scores';

export default function ScoreScreen({ navigation }: any) {
  const [puntajes, setpuntajes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      obtenerDatos();
    }, [])
  );

  async function obtenerDatos() {
    const { data: auth } = await supabase.auth.getSession();
    const user = auth.session?.user;
    if (!user) return;

    const { data } = await supabase
      .from('usuario')
      .select('scores')
      .eq('uid', user.id)
      .single();

    if (data?.scores) {
      const lista = Object.keys(data.scores).map((key) => ({
        nuevoPuntaje: key,
        puntos: data.scores[key]?.puntos || '',
        fecha: data.scores[key]?.fecha || '',
      }));
      setpuntajes(lista);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Puntajes</Text>
      <FlatList
        data={puntajes}
        keyExtractor={(item) => item.numeroOperacion}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40
  }
});