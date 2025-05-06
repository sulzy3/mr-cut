const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const barber = await prisma.barber.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@mrcut.com',
        phone_number: '+1234567890',
        bio: 'Professional barber with 10 years of experience in classic and modern cuts.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
      }
    });

    console.log('Created test barber:', barber);
  } catch (error) {
    console.error('Error creating test barber:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 