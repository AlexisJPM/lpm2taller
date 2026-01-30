import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'
import Avatars from '../components/Avatars'
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

export default function EditarPerfilScreen({ navigation }: any) {
  const [nombre, setnombre] = useState("")
  const [edad, setedad] = useState(0)
  const [avatar, setavatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. CARGAR DATOS ACTUALES AL ENTRAR
  useEffect(() => {
    async function obtenerPerfil() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('usuario')
          .select('*')
          .eq('uid', session.user.id)
          .single();

        if (data) {
          setnombre(data.nombre);
          setedad(data.edad);
          setavatar(data.avatar); // Muestra la imagen actual de la DB
        }
      }
      setLoading(false);
    }
    obtenerPerfil();
  }, []);

  // 2. FUNCIÓN PARA ACTUALIZAR (Reemplaza a 'registro')
  async function actualizarPerfil() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const uid = session.user.id;
      
      // Si el avatar es una ruta local (empieza con file://), la subimos
      if (avatar && avatar.startsWith('file://')) {
        await subirImagen(uid);
      }
      
      await guardar(uid);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
      navigation.goBack();
    }
  }

  async function guardar(uid: string) {
    // Generar la URL pública (asegúrate que la ruta coincida con subirImagen)
    const { data: publicUrlData } = supabase.storage
      .from('Avatar')
      .getPublicUrl(`usuario/${uid}.png`);

    const { error } = await supabase
      .from('usuario')
      .update({
        nombre: nombre,
        edad: edad,
        avatar: publicUrlData.publicUrl 
      })
      .eq('uid', uid); // <--- ¡ESTO ES VITAL PARA ACTUALIZAR!

    if (error) console.log("Error al actualizar tabla:", error.message);
  }

  async function subirImagen(uid: string) {
    if (!avatar) return;
    try {
      const base64 = await FileSystem.readAsStringAsync(avatar, {
        encoding: 'base64',
      });

      const { error } = await supabase.storage
        .from('Avatar')
        .upload(`usuario/${uid}.png`, decode(base64), {
          contentType: 'image/png',
          upsert: true // Sobrescribe la imagen anterior
        });

      if (error) console.log("Error Storage:", error.message);
    } catch (err) {
      console.log("Error procesando imagen:", err);
    }
  }

  // Funciones de Cámara y Galería (se mantienen igual pero usando setavatar)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setavatar(result.assets[0].uri);
  };

  const camara = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setavatar(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarBoton}>
        <Avatars uri={avatar} size={150} />
      </View>

      <TouchableOpacity style={styles.botonSimple} onPress={pickImage}>
        <Text style={{color: 'white'}}>Cambiar Foto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botonSimple2} onPress={camara}>
        <Text>Cámara</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Editar Datos</Text>

      <TextInput
        placeholder='Nombre'
        style={styles.input}
        onChangeText={setnombre}
        value={nombre}
      />
      <TextInput
        placeholder='Edad'
        style={styles.input}
        onChangeText={(texto) => setedad(+texto)}
        value={edad.toString()}
        keyboardType='numeric'
      />

      <TouchableOpacity style={styles.button} onPress={actualizarPerfil}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  )
}

// ... Estilos (se mantienen los tuyos)
const styles = StyleSheet.create({
    input: {
      backgroundColor: "#7EA296",
      borderColor: '#C5A059',
      fontSize: 15,
      margin: 5,
      height: 50,
      width: "80%",
      borderRadius: 7,
      paddingHorizontal: 15,
    },
    container: {
      flex: 1,
      backgroundColor: '#55776C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      margin: 20,
    },
    button: {
      backgroundColor: "#A6CCBD",
      height: 50,
      width: "60%",
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
    },
    avatarBoton: {
      alignItems: "center",
      marginBottom: 10
    },
    botonSimple: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
    },
    botonSimple2: {
      backgroundColor: '#21f321',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
})