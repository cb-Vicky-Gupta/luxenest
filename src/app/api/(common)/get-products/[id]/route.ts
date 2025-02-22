import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = parseInt((await params).id);

    const findProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!findProduct) {
      return NextResponse.json({ status: 401, msg: "Product not found" });
    }
    return NextResponse.json({ status: 200, data: findProduct });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
