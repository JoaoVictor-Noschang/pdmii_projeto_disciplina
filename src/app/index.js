import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function App() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/icons/logo02.png')}
                style={styles.logo}
            />
            <View style={styles.form}>
                <View style={styles.label}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput style={styles.input} placeholder='E-mail do usuário...' />
                </View>
                <View style={styles.label}>
                    <Text style={styles.title}>Senha</Text>
                    <TextInput style={styles.input} placeholder='Senha do usuário...' />
                </View>
            </View>
            <View style={styles.opts}>
                <TouchableOpacity style={styles.entrar} onPress={() => {router.replace("/dashboard")}}>
                    <Text style={styles.btn_entrar}>ENTRAR</Text>
                </TouchableOpacity>
                <Text style={styles.cad}>ou</Text>
                <Text style={styles.cad}>
                    faça o seu
                    <TouchableOpacity onPress={() => {router.replace("/cadastro")}} >
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
    }
});
