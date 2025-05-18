import {NextResponse} from 'next/server';
import {AppointmentService} from '@/services/appointment.service';
import {prisma} from '@/lib/prisma';

const appointmentService = new AppointmentService();

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const barberId = searchParams.get('barberId');
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json(
                {error: 'Date is required'},
                {status: 400}
            );
        }

        const appointments = await prisma.appointment.findMany({
            where: {
                ...barberId && {barber_id: barberId},
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
            {error: 'Failed to fetch appointments'},
            {status: 500}
        );
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
                {error: 'This time slot is already booked'},
                {status: 400}
            );
        }

        // Create the appointment using Prisma
        const appointment = await prisma.appointment.create({
            data: {
                barber_id: data.barber_id,
                service_id: data.service_id,
                date: new Date(data.date),
                time: data.time,
                status: data.status || 'PENDING',
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

        return NextResponse.json(appointment, {status: 201});
    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json(
            {error: 'Failed to create appointment: ' + error.message},
            {status: 500}
        );
    }
} 