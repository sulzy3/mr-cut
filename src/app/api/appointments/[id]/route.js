import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(request, {params}) {
    try {
        const {id} = params;
        const appointment = await prisma.appointment.findUnique({
                                                                    where: {id}
                                                                });

        if (!appointment) {
            return NextResponse.json({error: 'Appointment not found'}, {status: 404});
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return NextResponse.json({error: 'Failed to fetch appointment'}, {status: 500});
    }
}

export async function PUT(request, {params}) {
    try {
        const {id} = await params;
        const body = await request.json();
        console.log('Received update request:', {id, body});

        // Validate required fields
        const {date, time, barber_id, service_id} = body;
        if (!(barber_id && date && time && service_id)) {
            return NextResponse.json(
                {error: 'date, time, serviceId, and service are required'},
                {status: 400}
            );
        }

        // Check if appointment exists
        const existingAppointment = await prisma.appointment.findUnique({
                                                                            where: {id}
                                                                        });

        if (!existingAppointment) {
            return NextResponse.json({error: 'Appointment not found'}, {status: 404});
        }

        // Update the appointment
        const appointment = await prisma.appointment.update({
                                                                where: {id},
                                                                data: {
                                                                    date: new Date(date).toISOString(),
                                                                    time,
                                                                    service_id,
                                                                    barber_id,
                                                                }
                                                            });

        console.log('Appointment updated successfully:', appointment);
        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({error: 'Appointment not found'}, {status: 404});
        }
        return NextResponse.json({
                                     error: 'Failed to update appointment',
                                     details: error.message
                                 }, {status: 500});
    }
}

export async function DELETE(request, {params}) {
    try {
        const {id} = await params;
        await prisma.appointment.delete({
                                            where: {id}
                                        });

        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return NextResponse.json({error: 'Failed to delete appointment'}, {status: 500});
    }
} 