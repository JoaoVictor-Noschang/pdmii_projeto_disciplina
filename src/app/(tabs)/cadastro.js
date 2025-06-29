import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import { router } from 'expo-router';

export default function Calculadora() {

    const handlePressInput = () => {
        Alert.alert('[ERRO]: Funcionalidade ainda não disponível!');
    };

    return (
        <View style={styles.tela}>
            <TouchableOpacity
                style={styles.back}
                onPress={() => router.replace("/")}
            >
                <Image
                    source={require('../../../assets/icons/back.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <Image style={styles.logo} source={require('../../../assets/icons/logo02.png')} />

            <View style={styles.form}>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Nome de Usuário</Text>
                    <TextInput style={styles.input} placeholder='Nome do usuário...' readOnly={true} />
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput style={styles.input} placeholder='E-mail do usuário...' readOnly={true} />
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Senha</Text>
                    <TextInput style={styles.input} placeholder='Uma senha...' readOnly={true} />
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                    <View style={styles.inputData}>
                        <TextInput style={styles.inputDt} placeholder='dia' readOnly={true} />
                        <Text>/</Text>
                        <TextInput style={styles.inputDt} placeholder='mes' readOnly={true} />
                        <Text>/</Text>
                        <TextInput style={styles.inputDt} placeholder='ano' readOnly={true} />
                    </View>
                </View>
                <View style={styles.dadosImc}>
                    <View style={styles.labelInput}>
                        <Text style={styles.labelText}>Peso</Text>
                        <View style={styles.inputArea}>
                            <TextInput style={styles.inputImc} placeholder='Quilos' readOnly={true} />
                            <Text style={styles.medida}>Kg</Text>
                        </View>
                    </View>
                    <View style={styles.labelInput}>
                        <Text style={styles.labelText}>Altura</Text>
                        <View style={styles.inputArea}>
                            <TextInput style={styles.inputImc} placeholder='Metros' readOnly={true} />
                            <Text style={styles.medida}>Mt</Text>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.cad}
                onPress={() => router.replace("/dashboard")}
            >
                <Text style={styles.cadCont}>CADASTRAR</Text>
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
    back: {
        position: 'absolute',
        left: 30,
        top: 20
    },
    icon: {
        width: 25,
        height: 27,
    },
    logo: {
        width: 220,
        height: 90,
        marginHorizontal: 'auto',
        marginTop: -40
    },
    perfil: {
        width: 80,
        height: 80,
        marginHorizontal: 'auto',
        marginVertical: 20
    },
    form: {
        gap: 25,
        marginVertical: 50,
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
        width: '100%',
        textAlign: 'left',
        backgroundColor: '#D9D9D9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    inputData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 5
    },
    inputDt: {
        width: '30%',
        textAlign: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    dadosImc: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputImc: {
        width: '50%',
        textAlign: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    medida: {
        width: '8%'
    },
    cad: {
        backgroundColor: '#4895EF',
        width: '50%',
        marginHorizontal: 'auto',
        padding: 15,
        borderRadius: 10,
    },
    cadCont: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
});
