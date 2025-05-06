import { NextResponse } from 'next/server';
import { AppointmentService } from '@/services/appointment.service';

const appointmentService = new AppointmentService();

export async function GET() {
  try {
    const result = await appointmentService.findAll();
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Check if the appointment slot is available
    const isAvailable = await appointmentService.checkAvailability(
      data.barber_id,
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