import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch products from MongoDB using Prisma
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }, // Newest first
      take: 5 // Limit to 5 for the dashboard
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}