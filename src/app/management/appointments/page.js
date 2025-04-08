'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Appointment } from '@/entities/Appointment';
import ManagementSection from '@/components/ManagementSection';
import { format } from 'date-fns';

export default function AppointmentsManagementPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = Cookies.get('userData');
    if (!userData) {
      router.push('/');
      return;
    }

    const { userType } = JSON.parse(userData);
    if (userType !== 'barber' && userType !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadAppointments();
  }, [router]);

  const loadAppointments = async () => {
    try {
      const appointmentsList = await Appointment.getAll();
      setAppointments(appointmentsList);
    } catch (error) {
      setError('Failed to load appointments');
    }
  };

  const handleAdd = async (formData) => {
    try {
      await Appointment.create(formData);
      await loadAppointments();
    } catch (error) {
      setError('Failed to save appointment');
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      await Appointment.update(id, formData);
      await loadAppointments();
    } catch (error) {
      setError('Failed to update appointment');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await Appointment.delete(id);
        await loadAppointments();
      } catch (error) {
        setError('Failed to delete appointment');
      }
    }
  };

  const getAppointmentDetails = (appointment) => [
    { label: 'Date & Time', value: format(new Date(appointment.dateTime), 'PPp') },
    { label: 'Service', value: appointment.serviceName },
    { label: 'Barber', value: appointment.barberName },
    { label: 'Status', value: appointment.status }
  ];

  const appointmentFields = [
    {
      name: 'customerName',
      label: 'Customer Name',
      required: true
    },
    {
      name: 'dateTime',
      label: 'Date & Time',
      type: 'datetime-local',
      required: true,
      InputLabelProps: { shrink: true }
    },
    {
      name: 'serviceName',
      label: 'Service',
      required: true
    },
    {
      name: 'barberName',
      label: 'Barber',
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  ];

  const appointmentColumns = [
    { field: 'customerName', headerName: 'Customer' },
    { field: 'dateTime', headerName: 'Date & Time', format: (value) => format(new Date(value), 'PPp') },
    { field: 'serviceName', headerName: 'Service' },
    { field: 'barberName', headerName: 'Barber' },
    { field: 'status', headerName: 'Status', chip: true }
  ];

  const initialFormData = {
    customerName: '',
    dateTime: '',
    serviceName: '',
    barberName: '',
    status: 'pending'
  };

  return (
    <ManagementSection
      title="Appointment Management"
      items={appointments}
      fields={appointmentFields}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columns={appointmentColumns}
      getDetails={getAppointmentDetails}
      initialFormData={initialFormData}
      dialogTitle="Appointment"
    />
  );
}