import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#ff6347",
                    borderTopWidth: 0,
                    height: 100,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarIconStyle: {
                    marginTop: 20,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Dashboard",
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                            <Image
                                source={require('../../../../assets/icons/stats.png')}
                                style={styles.icon}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="refeicao"
                options={{
                    headerShown: false,
                    title: "Refeição",
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                            <Image
                                source={require('../../../../assets/icons/eat.png')}
                                style={styles.icon}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="hidratacao"
                options={{
                    headerShown: false,
                    title: "Hidratação",
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                            <Image
                                source={require('../../../../assets/icons/water.png')}
                                style={styles.icon}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="exercicio"
                options={{
                    headerShown: false,
                    title: "Exercício",
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                            <Image
                                source={require('../../../../assets/icons/gym.png')}
                                style={styles.icon}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="calculadora"
                options={{
                    headerShown: false,
                    title: "Calculadora",
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                            <Image
                                source={require('../../../../assets/icons/calculator.png')}
                                style={styles.icon}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 65,
        height: 65,
    },
    activeContainer: {
        backgroundColor: "#6EEB83", 
        borderRadius: 10, 
    },
    icon:{
        width: 30,
        height: 30,
    }
});
