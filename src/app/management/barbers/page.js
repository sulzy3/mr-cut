'use client';

import { useState, useEffect } from 'react';
import { Barber } from '@/entities/Barber';
import ManagementSection from '@/components/ManagementSection';

export default function BarbersManagement() {
  const [barbers, setBarbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const barbersList = await Barber.getAll();
      setBarbers(barbersList);
    } catch (error) {
      setError('Failed to load barbers');
    }
  };

  const handleAdd = async (formData) => {
    try {
      const barber = new Barber(formData);
      await barber.save();
      await loadBarbers();
    } catch (error) {
      setError('Failed to save barber');
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      const barber = new Barber({ ...formData, id });
      await barber.update();
      await loadBarbers();
    } catch (error) {
      setError('Failed to update barber');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this barber?')) {
      try {
        const barber = new Barber({ id });
        await barber.delete();
        await loadBarbers();
      } catch (error) {
        setError('Failed to delete barber');
      }
    }
  };

  const getBarberDetails = (barber) => [
    { label: 'Phone', value: barber.phone_number },
    { label: 'Specialties', value: barber.specialties?.join(', ') }
  ];

  const barberFields = [
    {
      name: 'first_name',
      label: 'First Name',
      required: true
    },
    {
      name: 'last_name',
      label: 'Last Name',
      required: true
    },
    {
      name: 'phone_number',
      label: 'Phone',
      required: true
    },
    {
      name: 'specialties',
      label: 'Specialties (comma separated)',
      required: true
    },
    {
      name: 'working_hours',
      label: 'Working Hours',
      customComponent: 'WorkingHoursEditor'
    }
  ];

  const barberColumns = [
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'phone_number', headerName: 'Phone' },
    { 
      field: 'specialties', 
      headerName: 'Specialties',
      renderCell: (barber) => barber.specialties?.join(', ')
    }
  ];

  const initialFormData = {
    first_name: '',
    last_name: '',
    phone_number: '',
    specialties: '',
    working_hours: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' }
    }
  };

  return (
    <ManagementSection
      title="Barber Management"
      items={barbers}
      fields={barberFields}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columns={barberColumns}
      getDetails={getBarberDetails}
      initialFormData={initialFormData}
      dialogTitle="Barber"
    />
  );
}