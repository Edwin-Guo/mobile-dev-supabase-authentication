import { useAuth } from "@/context/AuthProvider";
import { Redirect } from "expo-router";

export default function Index() {
  const { session } = useAuth();
  return <Redirect href={session ? "/profile" : "/sign-up"} />;
}
