import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const catId = parseInt((await params).id);
    const findProduct = await prisma.category.findUnique({
      where: { id: catId },
    });
    if (!findProduct) {
      return NextResponse.json({ status: 401, msg: "Category not found" });
    }
    return NextResponse.json({ status: 200, data: findProduct });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
