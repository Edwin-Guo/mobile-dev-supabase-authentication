import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Text, View } from "react-native";
const profile = () => {
  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase.from("instruments").select();

    if (error) {
      // setError(error.message);
      return;
    }
  }
  return (
    <View>
      <Text>Successfully signed in</Text>
      <Text>Welcome</Text>
    </View>
  );
};

export default profile;
