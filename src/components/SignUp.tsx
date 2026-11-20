import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { supabase } from "../lib/supabase";

const signUpSchema = z
  .object({
    email: z.email("Please enter a valid email").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Password confirmation required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

type FieldProps = {
  control: Control<SignUpData>;
  name: FieldPath<SignUpData>;
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
            style={styles.fieldBox}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
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
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const { control, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    router.navigate({
      pathname: "/profile",
    });
    if (error) {
      setError(error.message);
    } else if (!data.session) {
      // Email confirmation is on: the account exists, but nobody is signed in yet
      setNotice("Check your email to confirm your account.");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 30, padding: 10 }}>Sign Up</Text>

      <Text style={styles.title}>Email</Text>
      <Field control={control} name="email" email />
      <Text style={styles.title}>Password</Text>
      <Field control={control} name="password" secure />
      <Text style={styles.title}>Confirm Password</Text>
      <Field control={control} name="confirmPassword" secure />
      <Text>{notice}</Text>
      <Text style={styles.error}>{error}</Text>
      <Pressable style={styles.button} onPress={() => handleSubmit(onSubmit)()}>
        <Text style={[{ color: "#ffffff" }]}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  fieldBox: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#e8e8e8",
    width: 300,
    height: 40,
  },
  error: {
    color: "#ff0000",
    fontWeight: "bold",
  },
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
export default SignupForm;
