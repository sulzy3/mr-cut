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
      name: 'name',
      label: 'Name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      required: true
    },
    {
      name: 'specialties',
      label: 'Specialties (comma separated)',
      required: true
    },
    {
      name: 'workingHours',
      label: 'Working Hours',
      customComponent: 'WorkingHoursEditor'
    }
  ];

  const barberColumns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { 
      field: 'specialties', 
      headerName: 'Specialties',
      renderCell: (barber) => barber.specialties?.join(', ')
    }
  ];

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    specialties: '',
    workingHours: {
      monday: { start: '09:00', end: '17:00', isWorking: true },
      tuesday: { start: '09:00', end: '17:00', isWorking: true },
      wednesday: { start: '09:00', end: '17:00', isWorking: true },
      thursday: { start: '09:00', end: '17:00', isWorking: true },
      friday: { start: '09:00', end: '17:00', isWorking: true },
      saturday: { start: '09:00', end: '17:00', isWorking: true },
      sunday: { start: '09:00', end: '17:00', isWorking: false }
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