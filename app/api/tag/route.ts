import { NextRequest, NextResponse } from "next/server";
import Tag from "@/app/models/Tag";
import dbConnect from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 15;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(search, "i");

    const query = {
      $or: [
        { value: { $regex: searchRegex } },
        { label: { $regex: searchRegex } },
      ],
    };

    const [tags, totalCount] = await Promise.all([
      Tag.find(query).skip(skip).limit(limit),
      Tag.countDocuments(query),
    ]);

    const hasMore = totalCount > skip + tags.length;

    return NextResponse.json({
      results: tags.map((tag) => ({ value: tag.value, label: tag.label })),
      hasMore,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
