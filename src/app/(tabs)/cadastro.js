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

import { insertUser } from '../../../data/database';

export default function CadastroUsuario() {

    // Estados para armazenar os valores dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Usando 'password' para evitar conflito com 'pass' do DB
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleRegister = async () => {
        
        if (!name || !email || !password || !day || !month || !year) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        // Formatação da data de nascimento para o formato esperado pelo banco de dados (TEXT)
        const dateNasc = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        try {
            // Chama a função insertUser do DB e define o status como TRUE (logado)
            await insertUser(name, email, password, dateNasc, true);

            Alert.alert('Sucesso', 'Usuário cadastrado e logado com sucesso!');
            // Redireciona para o dashboard ou para a tela principal do app
            router.replace("/dashboard");

            // Opcional: Limpar os campos após o cadastro
            setName('');
            setEmail('');
            setPassword('');
            setDay('');
            setMonth('');
            setYear('');

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            // Mensagens de erro mais amigáveis ao usuário
            if (error.message.includes('UNIQUE constraint failed')) {
                Alert.alert('Erro no Cadastro', 'Este e-mail já está em uso. Tente outro.');
            } else {
                Alert.alert('Erro no Cadastro', 'Não foi possível cadastrar o usuário. Tente novamente.');
            }
        }
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
                    <TextInput 
                        style={styles.input} 
                        placeholder='Nome do usuário...' 
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='E-mail do usuário...' 
                        keyboardType="email-address" // Teclado otimizado para email
                        autoCapitalize="none" // Não capitalizar automaticamente
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Senha</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Uma senha...' 
                        //secureTextEntry // Esconder a senha
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                    <View style={styles.inputData}>
                        <TextInput 
                            style={styles.inputDt} 
                            placeholder='dia' 
                            keyboardType='numeric' 
                            maxLength={2}
                            value={day}
                            onChangeText={setDay}
                        />
                        <Text>/</Text>
                        <TextInput 
                            style={styles.inputDt} 
                            placeholder='mês' 
                            keyboardType='numeric' 
                            maxLength={2}
                            value={month}
                            onChangeText={setMonth}
                        />
                        <Text>/</Text>
                        <TextInput 
                            style={styles.inputDt} 
                            placeholder='ano' 
                            keyboardType='numeric' 
                            maxLength={4}
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.cad}
                onPress={handleRegister} // Chama a função de cadastro
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
