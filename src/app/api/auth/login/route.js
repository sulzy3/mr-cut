import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { phone_number } = await request.json();

    // Validate phone number
    if (!phone_number) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Find or create user by phone number
    const user = await prisma.user.upsert({
      where: { phone_number },
      update: {}, // No updates needed if user exists
      create: {
        phone_number,
        role: 'CUSTOMER', // Default role for new users
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone_number: true,
        role: true,
      },
    });

    // Map role to userType for client-side compatibility
    const userType = user.role === 'barber' ? 'barber' : 
                    user.role === 'admin' ? 'admin' : 'customer';

    // Return user data with userType
    return NextResponse.json({
      message: user.firstName ? 'Login successful' : 'New user created',
      user: {
        ...user,
        userType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 