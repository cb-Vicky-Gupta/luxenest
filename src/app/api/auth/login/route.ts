import { LoginResponse } from "@/interface";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const matchEmail = await prisma.user.findUnique({ where: { email } });
  console.log(matchEmail);
  if (!matchEmail) {
    return NextResponse.json({
      msg: "User not Found",
      status: 400,
    });
  }
  const matchPassword = await bcrypt.compare(password, matchEmail.password);
  if (!matchPassword) {
    return NextResponse.json({
      msg: "Please enter correct Password",
      status: 400,
    });
  }
  const findRole = await prisma.role.findUnique({where : { id : matchEmail.roleId}})
  const userData = {
    email: matchEmail.email,
    roleId: findRole,
    name: matchEmail.name,
    image: matchEmail.image,
    id: matchEmail.id,
  };
  
  const token = jwt.sign(userData, process.env.JWT_SECRET as string);
  const res =  NextResponse.json({
    msg: "User Logged-in Successfully",
    data: userData,
    token: token,
    status: 200,
  });

res.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NEXT_PUBLIC_SECURE_CODE === "production",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return res;
}