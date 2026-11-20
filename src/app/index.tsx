import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import SignupForm from "@/components/SignUp";
import { supabase } from "../lib/supabase";

type Instrument = {
  id: number;
  name: string;
};

export default function App() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase.from("instruments").select();

    if (error) {
      setError(error.message);
      return;
    }
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading instruments: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
