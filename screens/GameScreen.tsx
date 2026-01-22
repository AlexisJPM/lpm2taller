import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const { width, height } = Dimensions.get('window');

export default function ScoreScreen() {
  const [score, setScore] = useState(0);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });
  const [showBug, setShowBug] = useState(false);

  // Función para hacer que el bicho aparezca en una posición aleatoria
  const spawnBug = () => {
    const randomX = Math.floor(Math.random() * (width - 100));
    const randomY = Math.floor(Math.random() * (height - 150));
    setBugPosition({ x: randomX, y: randomY });
    setShowBug(true);
  };

  // Efecto para hacer que el bicho aparezca cada cierto tiempo
  useEffect(() => {
    spawnBug();
    const bugTimer = setInterval(() => {
      spawnBug();
    }, 2000);

    // Limpieza del timer cuando el componente se desmonte
    return () => clearInterval(bugTimer);
  }, []);

  // Función que se ejecuta al tocar el bicho
  const handleBugPress = () => {
    setScore(score + 1);
    setShowBug(false);
  };

  return (
    <ImageBackground style={styles.container} source={{ uri: "https://i.postimg.cc/Jzm2T07J/06-55-58-480-512.gif" }}>

      <Text style={styles.scoreText}>Puntos: {score}</Text>

      {showBug && (
        <TouchableOpacity
          style={[styles.bug, { left: bugPosition.x, top: bugPosition.y }]}
          onPress={handleBugPress}
        >
          <Image
            source={{ uri: "https://i.postimg.cc/nhTxV90f/honeybee-42907-1280.png" }}
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
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 100,
  },
  bug: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bugImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});