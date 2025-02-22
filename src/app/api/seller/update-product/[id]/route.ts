import { User } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = parseInt((await params).id);
    const sellerData = req.headers.get("user-data");
    const body = await req.json();
    if (!sellerData) {
      return NextResponse.json({ status: 400, msg: "You are unauthorized" });
    }
    let userData: User;
    userData = JSON.parse(sellerData) as User;
    const productDetails = await prisma.product.findUnique({
      where: { sellerId: userData.id, id: productId },
    });
    if (!productDetails) {
      return NextResponse.json({ status: 404, msg: "Product not found." });
    }
    const updateProduct = await prisma.product.update({
      where: { id: productId },
      data: body,
    });
    return NextResponse.json({
      status: 200,
      msg: "Product updated successfully",
      data: body,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Internal server error",
    });
  }
}
