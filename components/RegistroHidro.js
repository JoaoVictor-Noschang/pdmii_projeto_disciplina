import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function RegistroHidro({ registro, onDelete }) {

    const formatarDataHidro = (isoDateString) => {
        if (!isoDateString) return 'Data Inválida';

        const dateObj = new Date(isoDateString);

        if (isNaN(dateObj.getTime())) {
            return 'Data Inválida';
        }

        const dia = String(dateObj.getDate()).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
        const ano = String(dateObj.getFullYear()).slice(-2);
        const horas = String(dateObj.getHours()).padStart(2, '0');
        const minutos = String(dateObj.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
    };

    return (
        <View style={styles.card}>
            <View style={styles.head}>
                <Text style={styles.title}>Água</Text>
                <Text style={styles.date}>{formatarDataHidro(registro.diaHora)}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.tx}>{registro.quantidade} Ml</Text>
                <Text style={{ fontSize:12, color:'#7F7F7F' }}>
                    (ou {(registro.quantidade / 1000).toFixed(2)} Lt)
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deletar}
                onPress={() => onDelete && onDelete(registro.id)}
            >
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
        alignItems: 'flex-end',
        gap: 10
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
        height: 20,
    }
});
