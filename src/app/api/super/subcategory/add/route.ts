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
    const { name, categoryId } = await req.json();
    const syperAdminData = req.headers.get("user-data");
    if (!syperAdminData) {
      return NextResponse.json(
        {
          msg: "You are not authorized to add sub-category",
        },
        { status: 401 }
      );
    }
    let userData: User;
    try {
      userData = JSON.parse(syperAdminData) as User;
    } catch (error) {
      return NextResponse.json({ msg: "Invalid user data", status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id, roleId: 1 },
    });

    if (!existingUser) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }
    const existingCategory = await prisma.subcategory.findFirst({
      where: { name: name, categoryId: categoryId },
    });

    if (existingCategory) {
      return NextResponse.json({ status: 409, msg: "Category already Exist" });
    }

    const productData = await prisma.subcategory.create({
      data: {
        name,
        categoryId,
      },
    });
    return NextResponse.json({
      status: 201,
      productData,
      msg: "Category added Successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
