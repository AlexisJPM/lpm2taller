import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Scores({ item }: any) {
    return (
        <View style={styles.itemContainer}>

            <Text style={styles.valorPrincipal}> {item.nuevoPuntaje}</Text>
            <Text style={styles.valorSecundario}>Puntaje: {item.puntos}</Text>
            <Text style={styles.valorSecundario}>Fecha: {item.fecha}</Text>
            
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
        textAlign:'center'
    },

    valorSecundario: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});