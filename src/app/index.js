import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { initDb, loginUsuarioRegistrado, updateUserStatus, logoutAllUsers, getUsuarioLogado } from '../../data/database';

export default function App() {

    // Estado para controlar se o banco de dados já foi carregado
    const [dbLoaded, setDbLoaded] = useState(false);
    // Estado para armazenar possíveis erros durante o carregamento do banco de dados
    const [error, setError] = useState(null);

    const [email, setEmail] = useState(''); // Estado para o input de email
    const [password, setPassword] = useState(''); // Estado para o input de senha

    const [checkAutent, setCheckAutent] = useState(true); // Novo estado para indicar que estamos verificando a autenticação

    useEffect(() => {
        async function carregarDatabseEAutenticacao() {
            try {
                console.log('Tentando inicializar o banco de dados...');
                await initDb(); // CHAMA A FUNÇÃO DE INICIALIZAÇÃO 
                console.log('Banco de dados inicializado com sucesso no App.js!');

                // Verifica se já existe um usuário logado
                console.log('Verificando se há um usuário logado...');
                const usuarioLogado = await getUsuarioLogado();
                if (usuarioLogado) {
                    console.log('Usuário já logado encontrado:', usuarioLogado.name);

                    // Se houver um usuário logado, redireciona para o dashboard
                    router.replace("/dashboard");
                } else {
                    console.log('Nenhum usuário logado encontrado. Exibindo tela de login.');
                }

                setDbLoaded(true); // Marca como carregado se tudo deu certo
            } catch (err) {
                console.error('Erro ao carregar o banco de dados ou verificar autenticação no App.js:', err);
                setError(err);
            } finally {
                setCheckAutent(false); // Finaliza a verificação de autenticação
            }
        }

        carregarDatabseEAutenticacao();
    }, []);

    // Função para lidar com o processo de login
    const fazerLogin = async () => {
        // Validação básica dos campos
        if (!email || !password) {
            Alert.alert('Erro no Login', 'Por favor, preencha E-mail e Senha.');
            return;
        }

        try {
            // Tentando encontrar o usuário com as credenciais fornecidas
            const user = await loginUsuarioRegistrado(email, password);

            if (user) {

                // Desloga todos os outros usuários antes de logar o atual
                await logoutAllUsers();

                // Se for encontrado, atualiza o status para true
                await updateUserStatus(user.id, true);
                Alert.alert('Sucesso!', 'Login realizado com sucesso!');

                //Redireciona para o dashboard
                router.replace("/dashboard");

                setEmail('');
                setPassword('');
            } else {
                // Se as credenciais estiverem incorretas
                Alert.alert('Erro no Login', 'E-mail ou senha inválidos.');
            }
        } catch (err) {
            console.error('Erro durante o login:', err);
            Alert.alert('Erro no Login', 'Ocorreu um erro inesperado. Tente novamente.');
        }
    };

    // Se houver um erro crítico no carregamento do banco de dados, exiba a mensagem de erro
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erro crítico: Não foi possível carregar o banco de dados.</Text>
                <Text style={styles.errorText}>Detalhes: {error.message}</Text>
            </View>
        );
    }

    // Enquanto o banco de dados não está carregado, exiba a tela de carregamento
    if (!dbLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando banco de dados...</Text>
            </View>
        );
    }

    // Se o banco de dados foi carregado e não há erros, renderiza a tela principal de login
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/icons/logo02.png')}
                style={styles.logo}
            />
            <View style={styles.form}>
                <View style={styles.label}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail do usuário...'
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.label}>
                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Senha do usuário...'
                        //secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <View style={styles.opts}>
                <TouchableOpacity
                    style={styles.entrar}
                    onPress={fazerLogin} // Chama a nova função handleLogin
                >
                    <Text style={styles.btn_entrar}>ENTRAR</Text>
                </TouchableOpacity>
                <Text style={styles.cad}>ou</Text>
                <Text style={styles.cad}>
                    faça o seu
                    <TouchableOpacity onPress={() => { router.replace("/cadastro") }} >
                        <Text style={styles.text_link}>cadastro</Text>
                    </TouchableOpacity>
                    !
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        gap: 50,
        padding: 50,
        width: '100%',
        height: '100%'
    },
    logo: {
        marginHorizontal: 'auto',
        width: '80%',
        height: '12%',
        marginTop: -20,
    },
    form: {
        gap: 30,
    },
    label: {
        width: '100%',
        gap: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%',
    },
    input: {
        backgroundColor: '#CACACA',
        borderRadius: 10,
        padding: 10,
    },
    opts: {
        marginTop: 50,
    },
    entrar: {
        backgroundColor: '#FF5714',
        width: 150,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 'auto',
        marginBottom: 10,
    },
    btn_entrar: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    cad: {
        textAlign: 'center',
        fontSize: 16,
    },
    text_link: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginHorizontal: 5,
        marginVertical: -5,
        textDecorationLine: 'underline',
        color: '#6EEB83',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginHorizontal: 20,
    }
});