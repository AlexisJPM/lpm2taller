import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: "https://i.postimg.cc/dV6Vp84F/cats-9317796-1280.jpg" }}
    >
      <View >
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.text}>Desarrollado por: Alexis Panchi</Text>

        <Button
          title="Ingresar"
          onPress={() => navigation.navigate('BottonTab')}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
        fontSize: 25,
        justifyContent: "center"

    },
})