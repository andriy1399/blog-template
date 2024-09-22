"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { defaultSignInValues, signInSchema } from "@/lib/schemas/signin";
import { defaultSignUpValues, signUpSchema } from "@/lib/schemas/signup";
import { useRef } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  isSignUp?: boolean;
};

const AuthForm = ({ isSignUp }: Props) => {
  const form = useForm<z.infer<typeof signInSchema | typeof signUpSchema>>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: isSignUp ? defaultSignUpValues : defaultSignInValues,
  });
  const route = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    data: z.infer<typeof signInSchema | typeof signUpSchema>
  ) => {
    if (isSignUp) {
      try {
        const response = await axios.post("/api/auth/signup", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("User created successfully:", response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Error:", error.response.data.error.message);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Axios error:", error.message);
        }
      }
    }
    console.log("Signing in...", data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("Login result:", result);
    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      const resultUrl = result?.url ?? "";
      const urlObject = new URL(resultUrl);
      const redirectUrl = urlObject.searchParams.get("callbackUrl");
      route.push(redirectUrl ?? "/");
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-2"
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit, (data) => console.log(data))}
      >
        {isSignUp && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignUp && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-center pt-5">
          <Button type="submit" variant="secondary" size="lg">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
