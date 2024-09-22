"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const ProviderButtons = () => {
  const handleSignIn = async (provider: string) => {
    await signIn(provider);
  };
  return (
    <div className="flex space-x-4 mb-6">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub className="mr-2" />
        GitHub
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSignIn("google")}
      >
        <FaGoogle className="mr-2" />
        Google
      </Button>
    </div>
  );
};

export default ProviderButtons;
