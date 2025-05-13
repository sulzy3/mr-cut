import { NextResponse } from 'next/server';
import { AppointmentService } from '@/services/appointment.service';
import { prisma } from '@/lib/prisma';

const appointmentService = new AppointmentService();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get('barberId');
    const date = searchParams.get('date');

    if (!barberId || !date) {
      return NextResponse.json(
        { error: 'Barber ID and date are required' },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        barber_id: barberId,
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        }
      },
      include: {
        service: true,
        barber: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Check if the appointment slot is available
    const isAvailable = await appointmentService.checkAvailability(
      data.barberId,
      data.date,
      data.time
    );

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      );
    }

    const result = await appointmentService.create(data);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
} 