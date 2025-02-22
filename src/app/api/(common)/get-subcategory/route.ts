import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getsubCategory = await prisma.subcategory.findMany();
    return NextResponse.json({ status: 200, data: getsubCategory });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
