import { User } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = parseInt((await params).id);

    const sellerData = req.headers.get("user-data");

    if (!sellerData) {
      return NextResponse.json({ staus: 400, msg: "You are not authorized." });
    }
    let userData: User;
    userData = JSON.parse(sellerData) as User;
    const res = await prisma.product.findUnique({
      where: { id: productId, sellerId: userData.id },
    });
    if (!res) {
      return NextResponse.json({ status: 404, msg: "Product not found" });
    }
    await prisma.product.delete({
      where: { id: productId, sellerId: userData.id },
    });
    return NextResponse.json({
      status: 200,
      msg: "Product Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
