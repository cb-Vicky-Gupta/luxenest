import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getProducts = await prisma.product.findMany();
    return NextResponse.json({ status: 200, data: getProducts });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
