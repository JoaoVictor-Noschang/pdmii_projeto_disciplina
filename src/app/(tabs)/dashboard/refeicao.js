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
    Alert,
} from 'react-native';

import HeaderPage from '../../../../components/Header';
import RegistroRef from '../../../../components/RegistroRef';

import { addNewRefeicao, getUsuarioLogado, getRefeicoesByUserId, deleteRefeicao } from '../../../../data/database';

export default function RefeicaoPage() {

    const [modalVisible, setModalVisible] = useState(false);

    const [listRefeicoes, setListRefeicoes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [peso, setPeso] = useState('');
    const [caloria, setCaloria] = useState('');

    const parseNumero = (valor) => {
        const num = parseFloat(valor.replace(',', '.'));
        return isNaN(num) ? 0 : num;
    };

    const handleRegister = async () => {

        // Converte para número decimal e trata o uso de vírgula e ponto
        const realPeso = parseNumero(peso);
        const realCaloria = parseNumero(caloria);

        if (!titulo || !hora || !minuto || isNaN(realPeso) || isNaN(realCaloria)) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const dataInsert = new Date();
        const ano = dataInsert.getFullYear();
        // Formata para 2 dígitos (ex: 01, 02)
        const mes = (dataInsert.getMonth() + 1).toString().padStart(2, '0');
        const dia = dataInsert.getDate().toString().padStart(2, '0');

        // Garante que hora e minuto dos estados tenham 2 dígitos (ex: "5" vira "05")
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
            await addNewRefeicao(titulo, dateTimeSalvar, realPeso, realCaloria, idUserDoInsert);

            setModalVisible(false)

            Alert.alert('Sucesso', 'Refeição cadastrada com sucesso!');

            setTitulo('');
            setHora('');
            setMinuto('');
            setPeso('');
            setCaloria('');

            await fetchRefeicoes();

        } catch (error) {
            console.error('Erro ao cadastrar refeição:', error);

            Alert.alert('Erro no Cadastro', 'Não foi possível cadastrar a refeição. Tente novamente.');
        }
    }

    const fetchRefeicoes = useCallback(async () => {
        try {
            const user = await getUsuarioLogado();
            if (user && user.id) {
                const refeicoesDoUsuario = await getRefeicoesByUserId(user.id);
                setListRefeicoes(refeicoesDoUsuario);

            } else {
                console.log('Nenhum usuário logado para buscar refeições.');
                setListRefeicoes([]); // Limpa a lista se não houver usuário logado

            }
        } catch (error) {
            console.error('Erro ao buscar refeições:', error);
            Alert.alert('Erro', 'Não foi possível carregar suas refeições.');
            setListRefeicoes([]); // Em caso de erro, limpa a lista
        }
    }, []);

    useEffect(() => {
        fetchRefeicoes();
    }, [fetchRefeicoes]); // A dependência 'fetchRefeicoes' garante que a função seja executada quando 'fetchRefeicoes' muda (que só acontece uma vez devido ao useCallback)

    const clicarDeleteRefeicao = async (refeicaoId) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta refeição?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await deleteRefeicao(refeicaoId);
                            Alert.alert('Sucesso', 'Refeição excluída com sucesso!');
                            // Atualiza a lista após a exclusão
                            await fetchRefeicoes();

                        } catch (error) {
                            console.error('Erro ao excluir refeição:', error);
                            Alert.alert('Erro', 'Não foi possível excluir a refeição. Tente novamente.');
                            
                        }
                    },
                    style: "destructive" // Estilo para indicar que é uma ação destrutiva
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
                <Text style={styles.place}>Adicionar Refeição</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Registros de Refeições</Text>

            <ScrollView>
                {listRefeicoes.length === 0 ? (
                    <Text style={styles.noRecordsText}>Nenhuma refeição registrada ainda.</Text>
                ) : (
                    listRefeicoes.map((ref) => {
                        return (
                            <RegistroRef
                                key={ref.id}
                                registro={ref}
                                onDelete={clicarDeleteRefeicao}
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
                            <Text style={styles.mTitle}>Refeição</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Alimento.."
                                onChangeText={setTitulo}
                            />
                        </View>
                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Peso</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Gramas..."
                                keyboardType="numeric"
                                onChangeText={setPeso}
                                value={peso}
                            />
                        </View>
                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Calorias</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Kcal..."
                                keyboardType="numeric"
                                onChangeText={setCaloria}
                                value={caloria}
                            />
                        </View>

                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Hora da Refeição</Text>
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
                            <Button title="Cadastrar" onPress={handleRegister} />
                        </View>
                    </View>
                </View>
            </Modal >

        </View >
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
        backgroundColor: '#6EEB83',
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
        backgroundColor: '#FF8D79',
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
