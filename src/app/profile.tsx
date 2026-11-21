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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    backgroundColor: "#1e3a5f",
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 8,
    textAlign: "center"
  },
  listContainer: {
    flexGrow: 1,
    padding: 20
  },
  list: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center"
  }
})

export default profile;