import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function RegistroHidro({ registro }) {
    return (
        <View style={styles.card}>
            <View style={styles.head}>
                <Text style={styles.title}>{registro.title}</Text>
                <Text style={styles.date}>{registro.date}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.tx}>{registro.litro} Lt</Text>
            </View>
            <TouchableOpacity style={styles.deletar}>
                <Image
                    source={require('../assets/icons/lixeira.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#EDEDED',
        padding: 20,
        paddingBottom: 50,
        borderRadius: 20,
        gap: 15,
        marginVertical: 10
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4895EF',
    },
    date: {
        color: '#7F7F7F',
    },
    body: {
        flexDirection: 'row',
        gap: 20
    },
    tx: {
        fontSize: 16,
        color: '#4895EF',
    },
    deletar: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 38,
        height: 38,
        backgroundColor: '#7AB8FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    icon: {
        width: 25,
        height:20,
    }
});
