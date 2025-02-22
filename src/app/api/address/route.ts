import prisma from "@/lib/prisma";
import { headers } from "next/headers";
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
    const { city, block, post_office, country, landmark, pin_code } =
      await req.json();

    const userDataHeader = req.headers.get("user-data");

    if (!userDataHeader) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }

    let userData: User;
    try {
      userData = JSON.parse(userDataHeader) as User;
    } catch (error) {
      return NextResponse.json({ msg: "Invalid user data", status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!existingUser) {
      return NextResponse.json({ msg: "Unauthorized", status: 401 });
    }

    const address = await prisma.address.create({
      data: {
        city,
        block,
        post_office,
        country,
        landmark,
        pin_code,
        userId: userData.id,
      },
    });

    return NextResponse.json({
      status: 201,
      address,
      msg: "Address added Successfully",
    });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", status: 500 });
  }
}
