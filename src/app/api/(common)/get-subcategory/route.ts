import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getSubCategory = await prisma.subcategory.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json({ status: 200, data: getSubCategory });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
