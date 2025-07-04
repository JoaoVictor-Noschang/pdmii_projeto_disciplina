import React, { useState, useEffect, useCallback } from 'react';
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
    Alert
} from 'react-native';

import HeaderPage from '../../../../components/Header';
import RegistroHidro from '../../../../components/RegistroHidro';

import { addNewHidro, getUsuarioLogado, getHidroByUserId, deleteHidro } from '../../../../data/database';

export default function Hidratacao() {

    const [modalVisible, setModalVisible] = useState(false);

    const [listHidratacoes, setListHidratacoes] = useState([]);
    const [quantidade, setQuantidade] = useState('');
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');

    const handleRegister = async () => {

        const realQuant = parseFloat(quantidade);

        if (isNaN(realQuant) || !hora || !minuto) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const dataInsert = new Date();
        const ano = dataInsert.getFullYear();
        const mes = (dataInsert.getMonth() + 1).toString().padStart(2, '0');
        const dia = dataInsert.getDate().toString().padStart(2, '0');
        const horaFormatada = hora.padStart(2, '0');
        const minutoFormatado = minuto.padStart(2, '0');
        // Formato ISO 8601: YYYY-MM-DD HH:MM:SS
        const dateTimeSalvar = `${ano}-${mes}-${dia} ${horaFormatada}:${minutoFormatado}:00`;

        const userDoInsert = await getUsuarioLogado();

        if (!userDoInsert) {
            Alert.alert('Erro', 'Nenhum usuário logado. Não é possível cadastrar a refeição');
            return;
        }

        const idUserDoInsert = userDoInsert.id;

        try {
            await addNewHidro(quantidade, dateTimeSalvar, idUserDoInsert);

            setModalVisible(false)

            Alert.alert('Sucesso', 'Hidratação cadastrada com sucesso!');

            setQuantidade('');
            setHora('');
            setMinuto('');

            await fetchHidratacoes();

        } catch (error) {
            console.error('Erro ao cadastrar hidratação:', error);

            Alert.alert('Erro no Cadastro', 'Não foi possível cadastrar a hidratação. Tente novamente.');
        }
    }

    const fetchHidratacoes = useCallback(async () => {
        try {
            const user = await getUsuarioLogado();
            if (user && user.id) {
                const hidratacoesDoUsuario = await getHidroByUserId(user.id);
                setListHidratacoes(hidratacoesDoUsuario);

            } else {
                console.log('Nenhum usuário logado para buscar hidratações.');
                setListHidratacoes([]);

            }
        } catch (error) {
            console.error('Erro ao buscar hidratações:', error);
            Alert.alert('Erro', 'Não foi possível carregar suas hidratações.');
            setListHidratacoes([]);
        }
    }, []);

    useEffect(() => {
        fetchHidratacoes();
    }, [fetchHidratacoes]);

    const clicarDeleteHidratacao = async (hidroId) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta hidratação?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await deleteHidro(hidroId);
                            Alert.alert('Sucesso', 'Hidratação excluída com sucesso!');

                            await fetchHidratacoes();

                        } catch (error) {
                            console.error('Erro ao excluir hidratação:', error);
                            Alert.alert('Erro', 'Não foi possível excluir a hidratação. Tente novamente.');

                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.tela}>

            <HeaderPage />

            <TouchableOpacity
                style={styles.cadastrar}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    source={require('../../../../assets/icons/add_circle.png')}
                    style={styles.plus}
                />
                <Text style={styles.place}>Adicionar Hidratação</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Registros de Hidratação</Text>

            <ScrollView>
                {listHidratacoes.length === 0 ? (
                    <Text style={styles.noRecordsText}>Nenhuma hidratação registrada ainda.</Text>
                ) : (
                    listHidratacoes.map((hidro) => {
                        return (
                            <RegistroHidro
                                key={hidro.id}
                                registro={hidro}
                                onDelete={clicarDeleteHidratacao}
                            />
                        );
                    })
                )}
            </ScrollView>

            {/* MODAL */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.mContainer}>

                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Hidratação - Ml</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Água em Ml.."
                                keyboardType="numeric"
                                onChangeText={setQuantidade}
                                value={quantidade}
                            />
                        </View>
                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Hora da Hidratação</Text>
                            <View style={styles.mHora}>
                                <TextInput
                                    style={styles.mInputHor}
                                    placeholder='hora'
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={setHora}
                                    value={hora}
                                />
                                <Text style={styles.mTitle}>:</Text>
                                <TextInput
                                    style={styles.mInputHor}
                                    placeholder='min'
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={setMinuto}
                                    value={minuto}
                                />
                            </View>
                        </View>
                        <View style={styles.mButton}>
                            <Button color={'#FF1A1A'} title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button color={'#45D778'} title="Cadastrar" onPress={handleRegister} />
                        </View>
                    </View>
                </View>
            </Modal >

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
    cadastrar: {
        width: '100%',
        marginVertical: 20,
        padding: 25,
        backgroundColor: '#7AB8FF',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    plus: {
        width: 35,
        height: 35,
    },
    place: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        color: '#14213d',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mContainer: {
        width: '85%',
        backgroundColor: '#7AB8FF',
        borderRadius: 25,
        padding: 25,
        gap: 20,
    },
    mLabel: {
        gap: 5,
    },
    mTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mInput: {
        width: '100%',
        textAlign: 'left',
        backgroundColor: '#D9D9D9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    mInputHor: {
        width: '45%',
        textAlign: 'left',
        backgroundColor: '#D9D9D9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    mHora: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
