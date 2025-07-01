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
import RegistroRef from '../../../../components/RegistroRef';

export default function RefeicaoPage() {

    const [modalVisible, setModalVisible] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSalvarNota = () => {
        console.log('Título:', titulo);
        console.log('Descrição:', descricao);
        // Aqui você pode salvar a nota em um array, estado global, backend etc.
        setTitulo('');
        setDescricao('');
        setModalVisible(false);
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
                <RegistroRef registro={{ title: "Almoço", date: "28/06/2025 - 12:45", peso: 500, kal: 1200 }} />
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
                            />
                        </View>
                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Peso</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Gramas..."
                            />
                        </View>
                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Calorias</Text>
                            <TextInput
                                style={styles.mInput}
                                placeholder="Kcal..."
                            />
                        </View>

                        <View style={styles.mLabel}>
                            <Text style={styles.mTitle}>Hora da Refeição</Text>
                            <View style={styles.mHora}>
                                <TextInput style={styles.mInputHor} placeholder='hora' readOnly={true} />
                                <Text style={styles.mTitle}>:</Text>
                                <TextInput style={styles.mInputHor} placeholder='min' readOnly={true} />
                            </View>
                        </View>

                        <View style={styles.mButton}>
                            <Button color={'#FF1A1A'} title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Cadastrar" onPress={handleSalvarNota} />
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
