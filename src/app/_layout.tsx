import { Stack } from "expo-router";
// import {AuthProvider, useAuth} from "../context/AuthProvider"; // ????
export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Protected guard={!session}> */}

      <Stack.Screen name="index" options={{ title: "Index" }} />
      {/* </Stack.Protected> */}
      <Stack.Screen name="auth" options={{ title: "Authenticate" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
    </Stack>
  );
}

// Have auth provider wrap around navigation(?)
//
