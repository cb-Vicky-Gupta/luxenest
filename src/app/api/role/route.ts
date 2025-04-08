import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      where: {
        id: { not: 1 },
      },
    });

    return NextResponse.json({
      status: 200,
      data: roles,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}
