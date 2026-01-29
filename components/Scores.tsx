import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Scores({ item }: any) {
    const [loaded, error] = useFonts({
        'juego': require('../assets/fonts/Butterpop.otf'),
      });

    return (
        <View style={styles.itemContainer}>

            <Text style={styles.valorPrincipal}>Usuario: {item.nombre}</Text>
            <Text style={styles.valorSecundario}>Mejor Puntaje: {item.puntos}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        backgroundColor: "#7EA296",
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C5A059',
    },
    valorPrincipal: {
        fontSize: 20,
        fontFamily: 'juego',
        textAlign:'center',
        color: '#333',
    },

    valorSecundario: {
        fontSize: 18,
        fontFamily: 'juego',
        color: '#333',
    }
});