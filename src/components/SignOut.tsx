import { supabase } from "@/lib/supabase";
import { Pressable, Text } from "react-native";

export default function SignOut() {
  return (
    <Pressable onPress={() => supabase.auth.signOut()}>
      <Text style={{ color: "#d32f2f", fontWeight: "bold" }}>Sign out</Text>
    </Pressable>
  );
}
