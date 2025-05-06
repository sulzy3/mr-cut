import { NextResponse } from 'next/server';
import { User } from '@/entities/User';

export async function POST(request) {
  try {
    const { phone_number, first_name, last_name } = await request.json();

    if (!phone_number || !first_name || !last_name) {
      return NextResponse.json(
        { message: 'Phone number, first name, and last name are required' },
        { status: 400 }
      );
    }

    // Create a new manager user
    const manager = new User({
      phone_number,
      firstName: first_name,
      lastName: last_name,
      role: 'admin'
    });

    // Save the manager to the database
    await manager.save();

    return NextResponse.json(
      { message: 'Manager created successfully', user: manager.toJSON() },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating manager:', error);
    return NextResponse.json(
      { message: 'Failed to create manager' },
      { status: 500 }
    );
  }
} 