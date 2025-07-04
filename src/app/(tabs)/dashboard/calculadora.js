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

export default function CalculadoraPage() {

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

            <View style={styles.resultado}>
                <Text style={{ fontSize:18, fontWeight:'bold' }}>Resultado</Text>
                <View style={{ gap: 5 }}>
                        <Text>IMC</Text>
                        <Text style={styles.result}>IMC</Text>
                </View>
                <View style={{ gap: 5 }}>
                        <Text>Observação</Text>
                        <Text style={styles.result}>Normal para os dados informados</Text>
                </View>
            </View>
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
        marginTop: 30,
    },
    resultado: {
        padding: 25,
        backgroundColor: '#6EEB83',
        borderRadius: 15,
        marginTop: 30,
        gap: 10,
        borderWidth: 1,
        borderColor: '#7F7F7F',
    },
    result: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#7F7F7F',
    }
});
