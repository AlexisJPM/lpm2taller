import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabase/config';
import { useAudioPlayer } from 'expo-audio';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');
const audioSource = require('../assets/music/selva.mp3');

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });
  const [showBug, setShowBug] = useState(false);
  const [gameActive, setGameActive] = useState(false);

  const [loaded, fontError] = useFonts({
      'juego': require('../assets/fonts/Butterpop.otf'),
    });

  // Audio para el juego
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    if (player) {
      player.loop = true; // Bucle infinito
      player.play();      // Iniciar al entrar
    }
    
    // Detiene la música cuando sales de la pantalla del juego
    return () => {
      if (player) {
        player.pause();
      }
    };
  }, [player]);

  const isFocused = useIsFocused(); 
  useEffect(() => {
    if (!player) return;

    if (isFocused) {
      player.play();
    } else {
      player.pause(); // Si la pantalla pierde el foco, pausamos
    }
  }, [isFocused, player]);

  // Usamos un ref para el timer para poder limpiarlo correctamente
  const timerRef = useRef<any>(null);

  const startGame = () => {
    setScore(0);
    setErrors(0);
    setGameActive(true);
    spawnBug();

    timerRef.current = setInterval(() => {
      spawnBug();
    }, 1800);
  };

  // Función para hacer que el bicho aparezca en una posición aleatoria
  const spawnBug = () => {
    const randomX = Math.floor(Math.random() * (width - 100));
    const randomY = Math.floor(Math.random() * (height - 250)) + 100;
    setBugPosition({ x: randomX, y: randomY });
    setShowBug(true);
  };

  const acierto = () => {
    if (!gameActive) return;
    setScore(prev => prev + 1);
    setShowBug(false);
  };

 
  const error = () => {
    if (!gameActive) return;

    const newErrors = errors + 1;
    setErrors(newErrors);

    if (newErrors >= 3) {
      endGame();
    }
  };

 const endGame = async () => {
    setGameActive(false);
    setShowBug(false);
    clearInterval(timerRef.current);

    const finalScore = score;
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      Alert.alert("Fin del juego", `Puntos: ${finalScore}. No se pudo guardar: Usuario no identificado.`);
      return;
    }

    // 1. Obtenemos el puntaje que ya existe
    const { data: userData } = await supabase
      .from('usuario')
      .select('scores')
      .eq('uid', user.id)
      .single();

    const mejorPuntajePrevio = typeof userData?.scores === 'number' ? userData.scores : 0;

    // 3. Solo actualizamos si el actual es mayor
    if (finalScore > mejorPuntajePrevio) {
      const { error } = await supabase
        .from('usuario')
        .update({ scores: finalScore }) // Guardamos solo el número
        .eq('uid', user.id);

      if (!error) {
        Alert.alert("¡Nuevo Récord!", `¡Felicidades! Superaste tu marca anterior.\nNuevo récord: ${finalScore}`);
      } else {
        Alert.alert("Error", "No se pudo guardar el puntaje.");
      }
    } else {
      Alert.alert("¡Game Over!", `Puntuación: ${finalScore}\nTu mejor récord sigue siendo: ${mejorPuntajePrevio}`);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ flex: 1 }}
      onPress={error}
    >
      <ImageBackground
        style={styles.container}
        source={{ uri: "https://i.postimg.cc/Jzm2T07J/06-55-58-480-512.gif" }}
      >
        <View style={styles.header}>
          <Text style={styles.scoreText}>Puntos: {score}</Text>
          <Text style={[styles.scoreText, { color: '#ff4d4d' }]}>Errores: {errors}/3</Text>
        </View>

        {!gameActive && (
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.btnStart} onPress={startGame}>
              <Text style={styles.btnText}>COMENZAR JUEGO</Text>
            </TouchableOpacity>
          </View>
        )}

        {showBug && gameActive && (
          <TouchableOpacity
            style={[styles.bug, { left: bugPosition.x, top: bugPosition.y }]}
            onPress={(e) => {
              e.stopPropagation(); // IMPORTANTE: evita que el toque cuente como error
              acierto();
            }}
          >
            <Image
              source={{ uri: "https://i.postimg.cc/nhTxV90f/honeybee-42907-1280.png" }}
              style={styles.bugImage}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
  },
  scoreText: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    fontFamily: 'juego'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStart: {
    backgroundColor: '#C5A059',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  btnText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'juego'
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