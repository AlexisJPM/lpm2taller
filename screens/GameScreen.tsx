import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// Obtenemos las dimensiones de la pantalla para posicionar el bicho
const { width, height } = Dimensions.get('window');

export default function ScoreScreen() {
  const [score, setScore] = useState(0);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });
  const [showBug, setShowBug] = useState(false);

  // Función para hacer que el bicho aparezca en una posición aleatoria
  const spawnBug = () => {
    // Evitar que el bicho aparezca demasiado cerca de los bordes o fuera de la pantalla
    const randomX = Math.floor(Math.random() * (width - 100)); // Ancho de pantalla - ancho del bicho
    const randomY = Math.floor(Math.random() * (height - 150)); // Alto de pantalla - alto del bicho - altura de otros elementos
    setBugPosition({ x: randomX, y: randomY });
    setShowBug(true); // Hacemos visible el bicho
  };

  // Efecto para hacer que el bicho aparezca cada cierto tiempo
  useEffect(() => {
    // Hacemos aparecer el bicho la primera vez
    spawnBug();

    // Luego, hacemos que reaparezca cada 2 segundos
    const bugTimer = setInterval(() => {
      spawnBug();
    }, 2000); // Cambia este valor para que aparezca más o menos rápido

    // Limpieza del timer cuando el componente se desmonte
    return () => clearInterval(bugTimer);
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  // Función que se ejecuta al tocar el bicho
  const handleBugPress = () => {
    setScore(score + 1); // Suma un punto
    setShowBug(false); // Esconde el bicho inmediatamente
    // Opcional: Podrías hacer que el bicho reaparezca instantáneamente aquí también
    // spawnBug();
  };

  return (
    <ImageBackground style={styles.container} source={{ uri: "https://i.postimg.cc/Jzm2T07J/06-55-58-480-512.gif" }}>
      {/* Marcador de puntuación */}
      <Text style={styles.scoreText}>Puntos: {score}</Text>

      {/* El bicho que aparece */}
      {showBug && (
        <TouchableOpacity
          style={[styles.bug, { left: bugPosition.x, top: bugPosition.y }]}
          onPress={handleBugPress}
        >
          {/* Puedes usar una imagen real de un bicho o un View simple */}
          <Image
            source={{ uri: "https://i.postimg.cc/y8mG2c5y/bicho.png" }} // URL de la imagen de tu bicho
            style={styles.bugImage}
          />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Para que la imagen de fondo cubra toda la pantalla
    justifyContent: 'flex-start', // Alinea el texto de puntos en la parte superior
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50, // Separación de la parte superior
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente para que se lea mejor
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 100, // Asegura que el texto esté por encima de otros elementos
  },
  bug: {
    position: 'absolute', // Permite posicionar el bicho con 'left' y 'top'
    width: 80, // Tamaño del bicho
    height: 80, // Tamaño del bicho
    borderRadius: 40, // Para hacerlo circular si la imagen lo permite o si es un View
    // backgroundColor: 'red', // Solo para depuración, puedes quitarlo cuando tengas la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  bugImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Asegura que la imagen del bicho se ajuste al tamaño
  }
});