import { SignInData, signInSchema } from "@/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

type FieldProps = {
  control: Control<SignInData>;
  name: FieldPath<SignInData>;
  secure?: boolean;
  email?: boolean;
};

function Field({ control, name, secure, email }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            style={[styles.fieldBox, error && styles.invalidField]}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            autoCapitalize="none"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

function friendlyError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "Incorrect email or password.";
  if (m.includes("email not confirmed"))
    return "Please confirm your email before signing in.";
  if (m.includes("network") || m.includes("fetch"))
    return "Network error. Check your connection and try again.";
  return message || "Something went wrong. Please try again.";
}

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: SignInData) => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(friendlyError(error.message));
        return;
      }
      router.replace("/profile");
    } catch (e) {
      setError(friendlyError(e instanceof Error ? e.message : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 30, padding: 10 }}>Sign In</Text>

      <Text style={styles.title}>Email</Text>
      <Field control={control} name="email" email />
      <Text style={styles.title}>Password</Text>
      <Field control={control} name="password" secure />
      {error && <Text style={styles.error}>{error}</Text>}
      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={() => handleSubmit(onSubmit)()}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={{ color: "#ffffff" }}>Sign In</Text>
        )}
      </Pressable>
      <Pressable onPress={() => router.navigate("./sign-up")}>
        <Text style={{ color: "#006fbf" }}>No account? Sign up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20 },
  fieldBox: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#e8e8e8",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    width: 300,
    height: 40,
  },
  invalidField: {
    borderColor: "#ff0000",
  },
  error: { color: "#ff0000", fontWeight: "bold" },
  button: {
    backgroundColor: "#006fbf",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    width: 300,
    height: 40,
  },
});

export default SignInForm;
