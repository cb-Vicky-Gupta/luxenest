import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const subCatId = parseInt((await params).id);

    const findsubCat = await prisma.subcategory.findUnique({
      where: { id: subCatId },
    });

    if (!findsubCat) {
      return NextResponse.json({ status: 401, msg: "Product not found" });
    }
    return NextResponse.json({ status: 200, data: findsubCat });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal Server Error" });
  }
}
