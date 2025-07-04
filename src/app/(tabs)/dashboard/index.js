import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import HeaderPage from '../../../../components/Header';

export default function DashboardPage() {

    return (
        <View style={styles.tela}>

            <HeaderPage />

            <View style={styles.dashboard}>
                <View style={styles.headRel}>
                    <Text style={styles.title}>Relatórios</Text>
                    <Text style={styles.title}>HOJE</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Consumo de Caloriass</Text>
                    <Text style={[styles.labelInfo, { backgroundColor: '#FF5714' }]}>1.000 Kcal</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Consumo de Água</Text>
                    <Text style={[styles.labelInfo, { backgroundColor: '#1BE7FF' }]}>1,5 Lt</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Tempo de Eexercícios</Text>
                    <Text style={[styles.labelInfo, { backgroundColor: '#8C52FF' }]}>1h 30m</Text>
                </View>
                <View style={[styles.label, { marginTop: 15 }]}>
                    <Text style={styles.labelText}>IMC Atual</Text>
                    <View style={styles.dubLabel}>
                        <Text style={styles.labelImc}>22,86</Text>
                        <Text style={styles.labelImc}>Normal</Text>
                    </View>
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
    dashboard: {
        padding: 25,
        backgroundColor: '#0D3B66',
        borderRadius: 25,
        color: "#fff",
        gap: 30,
        marginVertical: 'auto',
    },
    headRel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#fff",
    },
    label: {
        gap: 5
    },
    labelText: {
        color: "#fff",
    },
    labelInfo: {
        width: '100%',
        borderRadius: 5,
        padding: 10
    },
    dubLabel: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: '2%',
    },
    labelImc: {
        width: '49%',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#6EEB83',
    }
});
