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

    const calcularImc = () => {
        const pesoNum = parseNumero(peso);
        const alturaNum = parseNumero(altura);

        if (pesoNum <= 0 || alturaNum <= 0) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente!');
            return;
        }

        const resultado = pesoNum / (alturaNum * alturaNum);
        const resultadoFormatado = resultado.toFixed(2);
        setImc(resultadoFormatado);

        let obs = '';

        if (resultado < 18.5) obs = 'Abaixo do peso';
        else if (resultado < 24.9) obs = 'Peso normal';
        else if (resultado < 29.9) obs = 'Sobrepeso';
        else if (resultado < 34.9) obs = 'Obesidade grau I';
        else if (resultado < 39.9) obs = 'Obesidade grau II';
        else obs = 'Obesidade grau III (mórbida)';

        setObservacao(obs);
        setMostraResultado(true);

        setPeso('');
        setAltura('');
    };

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
                onPress={() => calcularImc(peso, altura)}
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
                        <Text style={styles.result}>{ imc }</Text>
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
