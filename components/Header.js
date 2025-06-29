import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function HeaderPage() {
    return (
        <View style={styles.header}>
            <Image
                    source={require('../assets/icons/logo02.png')}
                    style={styles.logo}
                />
            <TouchableOpacity onPress={() => { router.replace("/perfil") }}>
                <Image
                    source={require('../assets/icons/user_circle.png')}
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
        width: '40%',
        height: '100%',
        marginTop: -10,
    },
    perfil: {
        width: 60,
        height: 60,
    },
});
