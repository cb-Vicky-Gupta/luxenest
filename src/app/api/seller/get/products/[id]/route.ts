import { User } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    // Extract `user-data` from headers
    const userDataHeader = req.headers.get("user-data");
    if (!userDataHeader) {
      return NextResponse.json({
        status: 401,
        msg: "You are unauthorized to access",
      });
    }

    let userData: User;
    try {
      userData = JSON.parse(userDataHeader) as User;
    } catch (error) {
      return NextResponse.json({ msg: "Invalid user data" }, { status: 400 });
    }

    const productId = (await params).id;

    if (!productId) {
      return NextResponse.json(
        { msg: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch product by ID and sellerId
    const product = await prisma.product.findUnique({
      where: { id: Number(productId), sellerId: userData.id },
    });

    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
