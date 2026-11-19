import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Control, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

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

type SignupData = z.infer<typeof signUpSchema>;

type FieldProps = {
  control: Control<SignupData>;
  secure?: boolean;
  email?: boolean;
};

const SignupForm = () => {
  const { control, handleSubmit } = useForm<SignupData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = (data: SignupData) => {
    router.navigate({
      pathname: "/",
      params: { name: data.email },
    });
  };
  return (
    <View>
      <Text>Bleh</Text>
    </View>
  );
};
export default SignupForm;
