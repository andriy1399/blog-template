import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import Post from "@/app/models/Post";
import { postSchema } from "@/lib/schemas/post";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await dbConnect();

    const jsonData = await request.json();
    const parseResult = postSchema.safeParse(jsonData);

    if (!parseResult.success) {
      return new Response(JSON.stringify(parseResult.error.errors), {
        status: 400,
      });
    }

    const { title, content, tags, coverImage } = parseResult.data;

    const newPost = new Post({
      title,
      content,
      tags,
      coverImage,
      author: session.user.id,
      createdAt: new Date(),
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
