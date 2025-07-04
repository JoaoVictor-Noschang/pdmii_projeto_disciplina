import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from 'react-native';

import HeaderPage from '../../../../components/Header';

import { getUsuarioLogado, getCaloriasDoDia, getHidroDoDia, getTempoExercDoDia } from '../../../../data/database';

export default function DashboardPage() {

    const [calorias, setCalorias] = useState(0);
    const [hidratacoes, setHidratacoes] = useState(0);
    const [tempExerc, setTempExerc] = useState(0);


    const fetchDados = useCallback(async () => {

        //Resgatando a data do dia atual para passar para as funções
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const hojeFormatado = `${ano}-${mes}-${dia}`;

        try {
            const user = await getUsuarioLogado();
            if (user && user.id) {
                const totalCalorias = await getCaloriasDoDia(user.id, hojeFormatado);
                setCalorias(totalCalorias);

                const totalHidro = await getHidroDoDia(user.id, hojeFormatado);
                setHidratacoes(totalHidro);

                const totalTempExerc = await getTempoExercDoDia(user.id, hojeFormatado);
                setTempExerc(totalTempExerc);

            } else {
                console.log('Nenhum usuário logado para resgatar os dados.');

                setCalorias(0);
                setHidratacoes(0);
                setTempExerc(0);

            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Não foi possível recuperar os dados.');

            setCalorias(0);
            setHidratacoes(0);
            setTempExerc(0);
            
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchDados();
        }, [fetchDados])
    );

    const formatarTempoExerc = (tempo) => {
        if (tempo >= 60) {
            const horas = Math.floor(tempo / 60);
            const minutosRestantes = tempo % 60;
            if (minutosRestantes > 0) {
                return `${horas} h ${minutosRestantes} min`;
            }
            return `${horas} h`;
        } else {
            return `${tempo} min`;
        }
    };

    return (
        <View style={styles.tela}>

            <HeaderPage />

            <View style={styles.dashboard}>
                <View style={styles.headRel}>
                    <Text style={styles.title}>Relatórios</Text>
                    <Text style={styles.title}>HOJE</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Consumo de Calorias</Text>
                    <Text style={[styles.labelInfo, { backgroundColor: '#FF5714' }]}>{calorias} Kcal</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Consumo de Água</Text>

                    <Text style={[styles.labelInfo, { backgroundColor: '#1BE7FF' }]}>
                        {(hidratacoes / 1000).toFixed(2)} Lt
                    </Text>

                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Tempo de Exercícios</Text>
                    <Text style={[styles.labelInfo, { backgroundColor: '#8C52FF' }]}>{formatarTempoExerc(tempExerc)}</Text>
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
