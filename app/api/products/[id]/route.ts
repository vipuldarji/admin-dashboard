import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Next.js 15: params is now a Promise
type Props = {
  params: Promise<{ id: string }>
};

// GET single product
export async function GET(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- We must await this now
    
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- We must await this now

    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params; // <--- We must await this now
    const body = await req.json();
    
    const product = await prisma.product.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}