import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import { createSuccessResponse } from "@/lib/response";
import { signUpSchema } from "@/lib/schemas/signup";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const jsonData = await request.json();
  const parsed = signUpSchema.safeParse(jsonData);
  if (!parsed.success) {
    return new Response(null, {
      status: 400,
      statusText: "Invalid form data",
    });
  }
  const { username, email, password } = parsed.data;

  try {
    await connectDB();
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return new Response(null, {
        status: 400,
        statusText: "User already exists",
      });
    }

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password,
      provider: "credentials",
    });

    await newUser.save();

    return Response.json(createSuccessResponse(newUser));
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return new Response(null, {
        status: 400,
        statusText: "Invalid user data provided",
      });
    }
    if (error.code === 11000) {
      return new Response(null, {
        status: 400,
        statusText: "User with this email already exists",
      });
    }
    return new Response(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
