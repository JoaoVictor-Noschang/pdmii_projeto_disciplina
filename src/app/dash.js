import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Modal,
    TextInput,
    Button,
} from 'react-native';

export default function AssetExample() {

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
            <View style={styles.header}>
                <Text style={styles.logo}>+LIFE</Text>
                <Image
                    source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }}
                    style={styles.perfil}
                />
            </View>
            
            <Text style={styles.subtitle}>DashBoard!</Text>

            {/* MODAL */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nova Nota</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            placeholder="Descrição"
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Salvar" onPress={handleSalvarNota} />
                        </View>
                    </View>
                </View>
            </Modal>

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
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 56,
        color: '#14213d',
    },
    perfil: {
        width: 70,
        height: 70,
        borderWidth: 4,
        borderColor: '#14213d',
        borderRadius: 40
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
        width: 30,
        height: 30,
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
        marginBottom: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
