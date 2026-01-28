import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabase/config';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });
  const [showBug, setShowBug] = useState(false);
  const [gameActive, setGameActive] = useState(false);

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

    // Obtenemos el documento actual del usuario
    const { data: userData } = await supabase
      .from('usuario')
      .select('scores')
      .eq('uid', user.id)
      .single();

    const docActual = userData?.scores || {};
    const gameId = `Partida_${Date.now()}`; 

    const nuevoPuntaje = {
      puntos: finalScore,
      fecha: new Date().toLocaleDateString(),
    };

    const nuevoDoc = {
      ...docActual,
      [gameId]: nuevoPuntaje
    };

    const { error } = await supabase
      .from('usuario')
      .update({ scores: nuevoDoc })
      .eq('uid', user.id);

    if (!error) {
      Alert.alert("¡Game Over!", `Has cometido 3 errores.\nPuntuación final: ${finalScore}\nTu record ha sido guardado.`);
    } else {
      Alert.alert("Error", "No se pudo guardar el puntaje.");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
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