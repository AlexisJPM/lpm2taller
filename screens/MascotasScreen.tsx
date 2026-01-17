import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function MascotasScreen() {

    const [nombre, setnombre] = useState("")
    const [raza, setraza] = useState("")
    const [color, setcolor] = useState("")
    const [propietario, setpropietario] = useState("")

    async function guardar() {

        if (nombre === "" || raza === "" || color === "" || propietario === "") {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        try {

            const { error } = await supabase
                .from('mascotas')
                .insert({
                    nombre: nombre,
                    raza: raza,
                    color: color,
                    propietario: propietario
                });

            if (error) {
               
                Alert.alert("Error", "No se guardo");
                console.log(error);
            } else {
                Alert.alert("Éxito", `La mascota "${nombre}" ha sido registrada.`);

                setnombre("");
                setraza("");
                setcolor("");
                setpropietario("");
            }
        } catch (err) {
            Alert.alert("Error", "No se pudo guardar.");
        }
    }

    return (
        <View
            style={styles.container}>

            <Image style={styles.img} source={{ uri: "https://i.postimg.cc/mgjgJQ8B/boy-8233868-1280.png" }} />
            <View >
                <Text style={styles.text}>Registra tu mascota</Text>
            </View>


            <TextInput
                placeholder='Nombre'
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
                value={nombre}
            />
            <TextInput
                placeholder='Raza'
                style={styles.input}
                onChangeText={(texto) => setraza(texto)}
                value={raza}
            />
            <TextInput
                placeholder='Color'
                style={styles.input}
                onChangeText={(texto) => setcolor(texto)}
                value={color}
            />
            <TextInput
                placeholder='Nombre Propietario'
                style={styles.input}
                onChangeText={(texto) => setpropietario(texto)}
                value={propietario}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={guardar}>
                <Text >Registar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    input: {
        backgroundColor: "#fdfdfd",
        fontSize: 12,
        margin: 5,
        height: 50,
        width: 300,
        borderRadius: 5
    },
    container: {

        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 25,
        justifyContent: "center"

    },
    button: {
        backgroundColor: "#0051ffa1",
        height: 50,
        width: "50%",
        flexDirection: "row",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 145,
        height: 150,
        marginTop: 50
    }
})