import ProviderButtons from "@/components/buttons/ProviderButtons";
import OR from "@/components/common/OR";
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
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <Card className="max-w-lg mx-auto mt-8 bg-header text-header-foreground">
      <CardHeader className="text-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <ProviderButtons />
        <OR />
        <AuthForm isSignUp />
      </CardContent>
      <CardFooter className="text-center flex justify-center">
        <Link href="/signin">
          <Button variant="link" className="text-header-foreground">
            <ArrowLeft className="h-6 w-6" />
            Back to Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
