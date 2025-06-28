import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function HeaderPage() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>+LIFE</Text>
            <TouchableOpacity onPress={() => { router.replace("/perfil") }}>
                <Image
                    source={require('../assets/icons/user.png')}
                    style={styles.perfil}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: 60,
        height: 60,
    },
});
