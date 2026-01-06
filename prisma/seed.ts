import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create Admin User
  const password = await bcrypt.hash('password123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password,
      role: 'admin',
    },
  })
  console.log({ user })

  // 2. Create Products (From your design)
  const products = [
    {
      name: "Intraocular Lens Premium",
      code: "IOL-2024-PRO",
      category: "Ophthalmic Products",
      price: 189.00,
      stock: 245,
      status: "active",
      imageUrl: "👁️" // Using emoji as placeholder for now
    },
    {
      name: "Anti-Cancer Drug XR-500",
      code: "PHAR-2024-AC",
      category: "Pharmaceuticals",
      price: 450.00,
      stock: 89,
      status: "active",
      imageUrl: "💊"
    },
    {
      name: "Ophthalmic Surgical Kit",
      code: "EQUIP-2024-SK",
      category: "Medical Equipment",
      price: 2499.00,
      stock: 12,
      status: "active", // Logic will handle "Low Stock" label on frontend
      imageUrl: "🔬"
    },
    {
      name: "Viscoelastic Solution Pro",
      code: "VIS-2024-PRO",
      category: "Ophthalmic Products",
      price: 79.00,
      stock: 156,
      status: "active",
      imageUrl: "💉"
    },
    {
      name: "Hepatitis-B Treatment Pack",
      code: "PHAR-2024-HB",
      category: "Pharmaceuticals",
      price: 320.00,
      stock: 0,
      status: "inactive",
      imageUrl: "💊"
    }
  ]

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    })
    console.log(`Created product: ${product.name}`)
  }

  console.log('✅ Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })