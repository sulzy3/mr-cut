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

    // Check if user exists (as either barber or any other role)
    const existingUser = await prisma.user.findUnique({
      where: { phone_number },
    });
 
    let user;
    
    if (existingUser) {
      // User exists, return as is
      user = existingUser;
    } else {
      // User doesn't exist, create new user as borrower
      user = await prisma.user.create({
        data: {
          phone_number,
          role: 'CUSTOMER', // Always create new users as customer
        },
      });
    }

    // Map role to userType for client-side compatibility
    const userType = user.role === 'BARBER' ? 'barber' : 
                    user.role === 'ADMIN' ? 'admin' : 'customer';

    // Return user data with userType
    return NextResponse.json({
      message: existingUser ? 'Login successful' : 'New user created as customer',
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