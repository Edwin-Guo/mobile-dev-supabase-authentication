import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import SignupForm from "@/components/SignUp";
import { supabase } from "../lib/supabase";

type Instrument = {
  id: number;
  name: string;
};

export default function SignUp() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
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

    setInstruments(data ?? []);
  }

  return (
    <View style={styles.container}>
      <SignupForm />
      <Text style={[{ fontSize: 20, marginTop: 20 }]}>List of Instruments</Text>
      {error && <Text>Error loading instruments: {error}</Text>}
      <FlatList
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
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
