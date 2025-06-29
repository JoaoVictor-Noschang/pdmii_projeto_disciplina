import { Stack } from "expo-router";

export default function Layout() {
    return(
        <Stack>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen 
                name="Perfil" 
                options={{
                    headerShown: true,
                    headerTitle: "Perfil",
                }} 
            />
            <Stack.Screen 
                name="cadastro" 
                options={{
                    headerShown: true,
                    headerTitle: "Cadastro de Usuário",
                }} 
            />
        </Stack>
    )
}