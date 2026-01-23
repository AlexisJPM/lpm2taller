
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function RegistroScreen() {
    const [cedula, setcedula] = useState("")
    const [nombre, setnombre] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [correo, setcorreo] = useState("")
    const [edad, setedad] = useState(0)

    async function guardar() {
        const { error } = await supabase
            .from('usuario')
            .insert({
                cedula: cedula,
                nombre: nombre,
                contrasenia: contrasenia,
                correo: correo,
                edad: edad
            })
        console.log(error);

    }

    return (
        <View
            style={styles.container}>

            <Image style={styles.usuario} source={{ uri: "https://i.postimg.cc/7hQwDzBS/perfil-del-usuario.png" }} />
            <View >
                <Text style={styles.text}>Registro de Usuario</Text>
            </View>


            <TextInput
                placeholder='Ingresar su cedula'
                style={styles.input}
                onChangeText={(texto) => setcedula(texto)}
                value={cedula}
            />
            <TextInput
                placeholder='Ingrese su nombre'
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
                value={nombre}
            />
            <TextInput
                placeholder='Ingresar su edad'
                style={styles.input}
                onChangeText={(texto) => setedad(+texto)}
                value={edad.toString()}
                keyboardType='numeric'
            />
            <TextInput
                placeholder='Cree su contraseña'
                style={styles.input}
                onChangeText={(texto) => setcontrasenia(texto)}
                value={contrasenia}

            />
            <TextInput
                placeholder='Ingresar su correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
                value={correo}
            />


            <TouchableOpacity style={styles.button} onPress={guardar} >
                <Text >Guardar</Text>
            </TouchableOpacity>
        </View>
    )
}

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
        justifyContent: "center",
        margin: 20
    },
    button: {
        backgroundColor: "#A6CCBD",
        height: 50,
        width: "50%",
        flexDirection: "row",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    usuario: {
        width: 145,
        height: 150,
        marginTop: 50
    }
})
