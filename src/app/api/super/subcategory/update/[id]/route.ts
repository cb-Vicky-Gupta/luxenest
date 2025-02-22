import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const subcatId = parseInt((await params).id);
    const checksubCategory = await prisma.subcategory.findUnique({
      where: { id: subcatId },
    });
    if (!checksubCategory) {
      return NextResponse.json({
        status: 404,
        msg: "Category not found with given id",
      });
    }
    const body = await req.json();
    const updatedCat = await prisma.subcategory.update({
      where: { id: subcatId },
      data: body,
    });
    return NextResponse.json({
      status: 200,
      msg: "subcategory Updated successfully",
      data: updatedCat,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
