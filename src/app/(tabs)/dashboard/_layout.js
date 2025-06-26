import { Tabs } from "expo-router";
import { Image, StyleSheet } from 'react-native';

export default function Layout() {
    return (
        <Tabs style={styles.nav}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Dashboard",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/stats.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
            <Tabs.Screen
                name="refeicao"
                options={{
                    headerShown: false,
                    title: "Refeição",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/eat.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
            <Tabs.Screen
                name="hidratacao"
                options={{
                    headerShown: false,
                    title: "Hidratação",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/water.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
            <Tabs.Screen
                name="exercicio"
                options={{
                    headerShown: false,
                    title: "Exercicio",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/gym.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
            <Tabs.Screen
                name="calculadora"
                options={{
                    headerShown: false,
                    title: "Calculadora",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/calculator.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
            <Tabs.Screen
                name="perfil"
                options={{
                    headerShown: false,
                    title: "Perfil",
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../../assets/icons/user.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    )
            }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    nav: {
        margin: 10,
        backgroundColor: 'red',
    }
})