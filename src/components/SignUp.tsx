import { supabase } from "@/lib/supabase";
import { SignUpData, signUpSchema } from "@/schemas/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type FieldProps = {
  control: Control<SignUpData>;
  name: FieldPath<SignUpData>;
  secure?: boolean;
  email?: boolean;
  disabled?: boolean;
};

function Field({ control, name, secure, email, disabled }: FieldProps) {
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
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            autoCapitalize="none"
            autoComplete={email ? "email" : "new-password"}
            autoCorrect={false}
            editable={!disabled}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: SignUpData) => {
    setError(null);
    setNotice("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else if (!data.session) {
      // Email Confirmation disabled
      setNotice("Check your email to confirm your account.");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 30, padding: 10 }}>Sign Up</Text>

      <Text style={styles.title}>Email</Text>
      <Field control={control} name="email" email disabled={isSubmitting} />
      <Text style={styles.title}>Password</Text>
      <Field control={control} name="password" secure disabled={isSubmitting} />
      <Text style={styles.title}>Confirm Password</Text>
      <Field
        control={control}
        name="confirmPassword"
        secure
        disabled={isSubmitting}
      />
      <Text>{notice}</Text>
      <Text style={styles.error}>{error}</Text>
      <Pressable
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={() => handleSubmit(onSubmit)()}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Text>
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
    borderWidth: 1,
    borderColor: "#e8e8e8",
    width: 300,
    height: 40,
  },
  invalidField: {
    borderColor: "#ff0000",
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
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
  },
});
export default SignupForm;
