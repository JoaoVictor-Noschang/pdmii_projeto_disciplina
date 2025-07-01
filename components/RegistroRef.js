import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function RegistroRef({ registro }) {
    return (
        <View style={styles.card}>
            <View style={styles.head}>
                <Text style={styles.title}>{registro.title}</Text>
                <Text>{registro.date}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.tx}>{registro.peso} g</Text>
                <Text style={styles.tx}>-</Text>
                <Text style={[styles.tx, { fontWeight: 'bold' }]}>{registro.kal} Kcal</Text>
            </View>
            <TouchableOpacity style={styles.deletar}>
                <Image
                    source={require('../assets/icons/delete.png')}
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
        color: '#ff6347',
    },
    body: {
        flexDirection: 'row',
        gap: 20
    },
    tx: {
        fontSize: 16,
        color: '#ff6347',
    },
    deletar: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    icon: {
        width: 40,
        height:40,
    }
});
