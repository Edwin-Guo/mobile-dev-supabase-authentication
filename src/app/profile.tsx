import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  created_at: string;
}

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