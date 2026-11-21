import SignInForm from "@/components/SignIn";
import { View } from "react-native";

export default function SignInScreen() {
  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 24 }}>
      <SignInForm />
    </View>
  );
}
