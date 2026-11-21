import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  created_at: string;
}

const profile = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    const { data, error } = await supabase.from("profiles").select();

    if (error) {
      console.log("Could not fetch profiles");
      console.log(error);
      return;
    }
    console.log("Fetched profiles:", data)
    setProfiles(data);
  }
  return (
    <View style = {styles.container}>
      <View style = {styles.top}>
        <Text style = {styles.header}>Successfully signed in!</Text>
        <Text style = {styles.header}>Welcome!</Text>
      </View>
      
      <FlatList
      data = {profiles}
      keyExtractor = {(item) => item.id}
      contentContainerStyle = {styles.container}
      renderItem = {({item}) => (
        <View style = {styles.list}>
          <Text>Name: {item.display_name}</Text>
          <Text>Bio: {item.bio || "no bio yet"}</Text>
          <Text>Created at: {item.created_at}</Text>
        </View>
      )}/>
    </View>
  );
};

export default profile;