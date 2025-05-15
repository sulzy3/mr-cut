'use client';

import { useState, useEffect } from 'react';
import { Barber } from '@/entities/Barber';
import ManagementSection from '@/components/ManagementSection';
import {getTranslations} from '@/translations';

const t = getTranslations(true);

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
      label: 'שם פרטי',
      required: true
    },
    {
      name: 'last_name',
      label: 'שם משפחה',
      required: true
    },
    {
      name: 'phone_number',
      label: 'טלפון',
      required: true
    },
    {
      name: 'working_hours',
      label: 'שעות עבודה',
      customComponent: 'WorkingHoursEditor'
    }
  ];

  const barberColumns = [
    { field: 'firstName', headerName: 'שם פרטי', align: 'right'},
    { field: 'lastName', headerName: 'שם משפחה', align: 'right' },
    { field: 'phone_number', headerName: 'טלפון', align: 'right' },
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
      title={t.barberManagement}
      items={barbers}
      fields={barberFields}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columns={barberColumns}
      getDetails={getBarberDetails}
      initialFormData={initialFormData}
      dialogTitle="ספר"
    />
  );
}