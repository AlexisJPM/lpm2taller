import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Scores({ item }: any) {

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
        fontSize: 18,
        fontWeight: 'bold',
    },

    valorSecundario: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});