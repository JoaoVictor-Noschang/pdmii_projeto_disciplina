import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Button,
} from 'react-native';

export default function Calculadora() {

    return (
        <View style={styles.tela}>
            <View style={styles.header}>
                <Text style={styles.logo}>+LIFE</Text>
                <Image
                    source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }}
                    style={styles.perfil}
                />
            </View>
            <Text>CALCULADORA IMC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        paddingTop: '15%',
        paddingHorizontal: 30,
        paddingBottom: '10%',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 56,
        color: '#14213d',
    },
    perfil: {
        width: 70,
        height: 70,
        borderWidth: 4,
        borderColor: '#14213d',
        borderRadius: 40
    },
});
