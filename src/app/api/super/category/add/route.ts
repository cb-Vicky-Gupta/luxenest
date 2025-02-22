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
    const { name } = await req.json();
    const superAdminData = req.headers.get("user-data");
    if (!superAdminData) {
      return NextResponse.json(
        {
          msg: "You are not authorized to add category",
        },
        { status: 401 }
      );
    }
    let userData: User;
    try {
      userData = JSON.parse(superAdminData) as User;
    } catch (error) {
      return NextResponse.json({ msg: "Invalid user data", status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id, roleId: 3 },
    });

    if (!existingUser) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      NextResponse.json({ status: 409, msg: "Category already Exist" });
    }

    const productData = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json({
      status: 201,
      productData,
      msg: "Category added Successfully",
    });
  } catch (error) {
    NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
