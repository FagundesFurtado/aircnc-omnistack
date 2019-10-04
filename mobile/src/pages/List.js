import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import { Alert, View, SafeAreaView, ScrollView, Text, Image, AsyncStorage, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { serverURL } from "../config/server"


import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }) {

    const [techs, setTechs] = useState([])


    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            console.log("Server url", serverURL)
            const socket = socketio(serverURL, {
                query: { user_id }
            })
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storagedTechs => {
            const techsArray = storagedTechs.split(",").map(t => t.trim());
            setTechs(techsArray);
        });

    }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('techs');
        navigation.navigate('Login')
    }


    return (<SafeAreaView style={styles.container}>

        <View style={styles.appbar}>
            <Image style={styles.logo} source={logo} />
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}> Sair</Text>

            </TouchableOpacity>
        </View>


        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>
    </SafeAreaView>)


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0
    },
    logo: {
        flex: 8,
        height: 32,
        paddingLeft: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    }, appbar: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignSelf: "flex-end"
    },
    buttonText: {
        fontSize: 16,
        color: "#f05a5b",
        marginRight: 5
    }
})