import { User } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
    return NextResponse.json({ msg: "Invalid user data", status: 400 });
  }
  const getAllProducts = await prisma.product.findMany({
    where: { sellerId: userData.id },
  });
  return NextResponse.json({ getAllProducts });
}
