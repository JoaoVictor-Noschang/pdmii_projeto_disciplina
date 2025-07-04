import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function RegistroExerci({ registro, onDelete }) {

    const formatarDataExerc = (isoDateString) => {
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

    const formatarTempoExerc = (tempo) => {
        if (tempo >= 60) { 
            return (tempo / 60).toFixed(1) + 'h'; 
        } else {
            return tempo + 'min';
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.head}>
                <Text style={styles.title}>{registro.titulo}</Text>
                <Text style={styles.date}>{formatarDataExerc(registro.diaHora)}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.tx}>{formatarTempoExerc(registro.tempoMin)}</Text>
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
        color: '#8C52FF',
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
        color: '#8C52FF',
    },
    deletar: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 38,
        height: 38,
        backgroundColor: '#AC83FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    icon: {
        width: 25,
        height: 20,
    }
});
