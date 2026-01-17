import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'

export default function Informacion(props: any) {
  const { item } = props;

  const detalleMascota = () => {
    Alert.alert(
      "Detalles de la Mascota",
      `ID: ${item.id}\nNombre: ${item.nombre}\nRaza: ${item.raza}\nColor: ${item.color}\nDueño: ${item.propietario}`
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={detalleMascota}>
      <Text style={styles.txtNombre}> Mascota: {item.nombre}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  txtNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})