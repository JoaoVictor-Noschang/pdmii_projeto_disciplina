import React, { useState, useEffect } from 'react';
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

import { getUsuarioLogado, updateUserStatus } from '../../../data/database';

export default function PerfilUsuario() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function recuperarDadosUsuario() {
            try {
                const usuarioLogado = await getUsuarioLogado();
                if (usuarioLogado) {
                    setUser(usuarioLogado); // Define os dados do usuário no estado
                } else {
                    // Se não houver usuário logado, alerta e redireciona para a tela de login
                    Alert.alert('Erro', 'Nenhum usuário logado encontrado. Redirecionando para o login.');
                    router.replace("/");
                }
            } catch (err) {
                console.error('Erro ao buscar dados do usuário:', err);
                setError(err); // Armazena o erro
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            }
        }

        recuperarDadosUsuario();
    }, []);

    // Função para fazer o LogOff
    const fazerLogOff = async () => {
        if (!user || !user.id) {
            Alert.alert('Erro', 'Não foi possível identificar o usuário para fazer logoff.');
            return;
        }

        try {
            // Atualiza o status do usuário logado para FALSE no banco de dados
            await updateUserStatus(user.id, false);
            Alert.alert('Sucesso', 'Você foi desconectado.');
            // Redireciona para a tela de login
            router.replace("/");
        } catch (err) {
            console.error('Erro ao fazer logoff:', err);
            Alert.alert('Erro', 'Não foi possível fazer logoff. Tente novamente.');
        }
    };

    return (
        <View style={styles.tela}>
            <TouchableOpacity
                style={styles.back}
                onPress={() => router.replace("/dashboard")}
            >
                <Image
                    source={require('../../../assets/icons/back.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <Image style={styles.logo} source={require('../../../assets/icons/logo02.png')} />
            <Image style={styles.perfil} source={require('../../../assets/icons/user_circle.png')} />

            <View style={styles.form}>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Nome de Usuário</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome do usuário'
                        value={user?.name || ''} // Exibe o nome do usuário
                        readOnly={true}
                    />
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        value={user?.email || ''} // Exibe o e-mail do usuário
                        readOnly={true}
                    />
                </View>
                <View style={styles.labelInput}>
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Data de Nascimento'
                        value={user?.dateNasc || ''} // Exibe o e-mail do usuário
                        readOnly={true}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={styles.atualizar}
                onPress={() => { handlePressInput() }}
            >
                <Text style={styles.atuCont}>Atualizar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.sair}
                onPress={fazerLogOff} // Chama a função de logoff
            >
                <Text style={styles.logoffCont}>LogOff</Text>
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
        width: 170,
        height: 70,
        marginHorizontal: 'auto',
        marginTop: -50,
    },
    perfil: {
        width: 80,
        height: 80,
        marginHorizontal: 'auto',
        marginVertical: 20
    },
    form: {
        gap: 30,
        marginVertical: 20
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
    atualizar: {
        backgroundColor: '#4895EF',
        width: '50%',
        marginHorizontal: 'auto',
        padding: 15,
        borderRadius: 10,
        margin: 15,
    },
    atuCont: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
    sair: {
        backgroundColor: '#FF1A1A',
        width: '30%',
        marginHorizontal: 'auto',
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    logoffCont: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    }
});
