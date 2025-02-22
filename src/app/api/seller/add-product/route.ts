import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface User {
  name: string;
  id: number;
  email: string;
  image?: string;
  roleId: number;
}
export async function POST(req: Request) {
  try {
    const {
      name,
      image,
      description,
      stock,
      attribute,
      categoryId,
      subcategoryId,
    } = await req.json();
    const sellerData = req.headers.get("user-data");
    if (!sellerData) {
      return NextResponse.json(
        {
          msg: "You are not authorized to add product",
        },
        { status: 401 }
      );
    }
    let userData: User;
    try {
      userData = JSON.parse(sellerData) as User;
    } catch (error) {
      return NextResponse.json({ msg: "Invalid user data", status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!existingUser) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }
    const productData = await prisma.product.create({
      data: {
        name,
        image,
        description,
        stock,
        attribute,
        categoryId,
        subcategoryId,
        isActive: true,
        sellerId: userData.id,
      },
    });
    return NextResponse.json({
      status: 201,
      productData,
      msg: "Product added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
