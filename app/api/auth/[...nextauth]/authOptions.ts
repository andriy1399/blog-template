import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          });
          if (!user) {
            console.error("User not found");
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            console.error("Invalid credentials");
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async signIn({ user, account }) {
      try {
        if (user) {
          await connectDB();
          const existingUser = await User.findOne({
            email: user.email?.toLowerCase(),
          });
          console.log(account);
          if (account && !existingUser && account.provider !== "credentials") {
            const newUser = new User({
              username: user.name || user.email?.split("@")[0],
              email: user.email?.toLowerCase(),
              provider: account?.provider,
              providerAccountId:
                account?.id ?? account?.providerAccountId ?? null,
              _id: account?.id ?? account?.providerAccountId ?? undefined,
              picture: user.image,
            });
            console.log("New user created:", newUser);

            await newUser.save();
          }
        }
        return true;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false;
      }
    },
  },
};
