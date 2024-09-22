import AuthForm from "@/components/forms/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import OR from "@/components/common/OR";
import ProviderButtons from "@/components/buttons/ProviderButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  
  return (
    <Card className="max-w-lg mx-auto mt-8 bg-header text-header-foreground">
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <ProviderButtons />
        <OR />
        <AuthForm />
      </CardContent>
      <CardFooter className="text-center flex justify-center">
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="">
            <Button variant="link" className="text-header-foreground">
              Sign up here
            </Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
