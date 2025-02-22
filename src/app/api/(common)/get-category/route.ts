import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getCategory = await prisma.category.findMany();
    return NextResponse.json({ status: 200, data: getCategory });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
