import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const catId = parseInt((await params).id);
    const checkCategory = await prisma.category.findUnique({
      where: { id: catId },
    });
    if (!checkCategory) {
      return NextResponse.json({
        status: 404,
        msg: "Category not found with given id",
      });
    }
    await prisma.category.delete({
      where: { id: catId },
    });
    return NextResponse.json({
      status: 200,
      msg: "Category Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
