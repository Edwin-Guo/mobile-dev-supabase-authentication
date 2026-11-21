import SignOut from "@/components/SignOut";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthProvider";

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Index" }} />

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
      </Stack.Protected>

      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="profile"
          options={{
            title: session?.user.email ?? "Profile",
            headerRight: () => <SignOut />,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
