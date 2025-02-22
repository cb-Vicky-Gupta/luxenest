import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const catId = (await params).id;
    console.log(typeof catId);
    const checkCategory = await prisma.category.findUnique({
      where: { id: parseInt(catId) },
    });
    console.log(checkCategory, "FindUnique");
    if (!checkCategory) {
      return NextResponse.json({
        status: 404,
        msg: "Category not found with given id",
      });
    }

    const body = await req.json();
    const updatedCat = await prisma.category.update({
      where: { id: parseInt(catId) },
      data: body,
    });
    return NextResponse.json({
      status: 200,
      msg: "Category Updated successfully",
      data: updatedCat,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
