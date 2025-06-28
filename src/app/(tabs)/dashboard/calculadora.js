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

import HeaderPage from '../../../../components/Header';

export default function Calculadora() {

    return (
        <View style={styles.tela}>

            <HeaderPage />

            <View style={styles.title}>
                <Text style={styles.titleText}>Calculadora de IMC</Text>
                <Text>Ídice de Massa Corporal</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Peso</Text>
                    <View style={styles.inputArea}>
                        <TextInput style={styles.input} placeholder='Quilos' />
                        <Text style={styles.medida}>Kg</Text>
                    </View>
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Altura</Text>
                    <View style={styles.inputArea}>
                        <TextInput style={styles.input} placeholder='Metros' />
                        <Text style={styles.medida}>Mt</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.btn}>
                <Text 
                    style={{ fontWeight: 'bold', color:'#fff', fontSize:16, textAlign: 'center' }}
                >CALCULAR</Text>
            </TouchableOpacity>
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
    title: {
        marginVertical: 30,
        gap: 5
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    form: {
        gap: 20,
    },
    labelInput: {
        gap: 5,
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    input: {
        width: '40%',
        textAlign: 'center',
        backgroundColor: '#D9D9D9',
        padding: 8,
        borderRadius: 20,
    },
    medida: {
        fontSize: 16
    },
    btn: {
        width: '50%',
        backgroundColor: '#FF5714',
        padding: 10,
        paddingVertical: 15,
        marginHorizontal: 'auto',
        borderRadius: 10,
        marginTop: 40,
    }
});
