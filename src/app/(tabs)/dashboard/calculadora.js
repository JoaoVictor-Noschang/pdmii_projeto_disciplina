import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';

import HeaderPage from '../../../../components/Header';

export default function CalculadoraPage() {

    const [mostraResultado, setMostraResultado] = useState(false);

    const [imc, setImc] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [observacao, setObservacao] = useState('');

    // Função que normaliza o número (troca vírgula por ponto)
    const parseNumero = (valor) => {
        const num = parseFloat(valor.replace(',', '.'));
        return isNaN(num) ? 0 : num;
    };

    const calcularImcRemote = async () => {
        const numPeso = parseNumero(peso);
        const numAltura = parseNumero(altura);

        // validação básicado dos antes de enviar para o serviço
        if(isNaN(numPeso) || isNaN(numAltura) || numPeso <=0 || numAltura <=0) {
            Alert.alert('Erro de Entrada', 'Por favor, insira valores válidos e maiores que zero para peso e altura.');
            setImc('');
            setObservacao('Dados inválidos');
            return;
        }

        try {
            // Url do microserviço
            const apiUrl = 'http://<ipLocal>:<portaUtilizada>/calculate-imc';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ peso: numPeso, altura: numAltura }),
            });

            const data = await response.json();

            // Verifica se a resposta HTTP foi bem-sucedida (status 2xx)
            if(response.ok) {
                setImc(data.imc.toFixed(2));
                setObservacao(data.observation);
                setMostraResultado(true);

                setPeso('');
                setAltura('');

            } else {
                // Lida com erros retornados pelo serviço (status 4xx, 5xx)
                Alert.alert('Erro no Cálculo', data.error || 'Não foi possível calcular o IMC.');
                setImc('');
                setObservacao('Erro no serviço');

            }

        } catch (error) {
            console.error('Erro ao conectar ao microserviço de IMC:', error);
            Alert.alert('Erro de Conexão', 'Não foi possível conectar ao serviço de cálculo de IMC. Verifique sua rede e se o serviço está rodando.');
            setImc('');
            setObservacao('Erro de conexão');
        }
    }

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
                        <TextInput
                            style={styles.input}
                            placeholder='Quilos'
                            keyboardType="numeric"
                            onChangeText={setPeso}
                            value={peso}
                        />
                        <Text style={styles.medida}>Kg</Text>
                    </View>
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Altura</Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder='Metros'
                            keyboardType="numeric"
                            onChangeText={setAltura}
                            value={altura}
                        />
                        <Text style={styles.medida}>Mt</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={calcularImcRemote}
            >
                <Text
                    style={{ fontWeight: 'bold', color: '#fff', fontSize: 16, textAlign: 'center' }}
                >CALCULAR</Text>
            </TouchableOpacity>

            {mostraResultado && (
                <View style={styles.resultado}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Resultado</Text>
                    <View style={{ gap: 5 }}>
                        <Text>IMC</Text>
                        <Text style={styles.result}>{ imc || '0.00' }</Text>
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text>Observação</Text>
                        <Text style={styles.result}>{ observacao }</Text>
                    </View>
                </View>
            )}

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
