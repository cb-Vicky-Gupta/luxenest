import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { filter, search } = await req.json();
    // Construct the where clause dynamically
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { subcategory: { contains: search, mode: "insensitive" } },
      ];
    }

    // Apply filters dynamically (Example: category, price range, inStock)
    if (filter) {
      if (filter.category) {
        whereClause.categoryId = parseInt(filter.category);
      }
      if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
        whereClause.price = { gte: filter.minPrice, lte: filter.maxPrice };
      }
      if (filter.stock !== undefined) {
        whereClause.stock = filter.stock;
      }
    }

    // Fetch products based on filters/search criteria
    const getProducts = await prisma.product.findMany({
      where: Object.keys(whereClause).length ? whereClause : {},
    });
    return NextResponse.json({ status: 200, data: getProducts });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
