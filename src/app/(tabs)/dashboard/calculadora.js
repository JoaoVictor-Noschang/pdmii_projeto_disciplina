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
});
