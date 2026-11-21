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
    <View>
      <Text>Successfully signed in</Text>
      <Text>Welcome</Text>
    </View>
  );
};

export default profile;