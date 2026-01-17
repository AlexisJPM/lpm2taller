import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'

export default function LeerScreen() {

  const [mascotas, setmascotas] = useState([])

  useEffect(() => {
    leermascotas()
  }, [])


  async function leermascotas() {

    const { data, error } = await supabase
      .from('mascotas')
      .select()
    setmascotas(data)

  }


  return (
    <View>
      <Text>Listado de mascotas</Text>
      <FlatList
        data={mascotas}
        renderItem={({ item }: any) =>
          <View>
            <Text>{item.nombre}</Text>
            <Text>{item.raza}</Text>
            <Text>{item.color}</Text>
            <Text>{item.propietario}</Text>
            <Text></Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({})