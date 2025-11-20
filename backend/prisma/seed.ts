import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ========================================
  // SEED TRAINERS
  // ========================================
  const trainers = [
    {
      name: 'John Smith',
      email: 'john.trainer@gym.com',
      password: 'trainer123',
      specialization: 'Strength Training & Bodybuilding'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.trainer@gym.com',
      password: 'trainer123',
      specialization: 'Cardio & Weight Loss'
    }
  ];

  console.log('👨‍🏫 Seeding trainers...');

  for (const trainer of trainers) {
    // Check if trainer already exists
    const existingTrainer = await prisma.trainer.findUnique({
      where: { email: trainer.email }
    });

    if (existingTrainer) {
      console.log(`   ⚠️  Trainer ${trainer.email} already exists. Skipping...`);
      continue;
    }

    // Hash password
    const hashedPassword = await hashPassword(trainer.password);

    // Create trainer
    await prisma.trainer.create({
      data: {
        name: trainer.name,
        email: trainer.email,
        password: hashedPassword,
        specialization: trainer.specialization
      }
    });

    console.log(`   ✅ Created trainer: ${trainer.name} (${trainer.email})`);
  }

  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📋 Seeded Trainer Credentials:');
  console.log('   1. Email: john.trainer@gym.com | Password: trainer123');
  console.log('   2. Email: sarah.trainer@gym.com | Password: trainer123');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
