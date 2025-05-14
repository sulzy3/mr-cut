'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Service } from '@/entities/Service';
import ManagementSection from '@/components/ManagementSection';

export default function ServiceManagementPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
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

    loadServices();
  }, [router]);

  const loadServices = async () => {
    try {
      const servicesList = await Service.getAll();
      setServices(servicesList);
    } catch (error) {
      setError('Failed to load services');
    }
  };

  const handleAdd = async (formData) => {
    try {
      const service = new Service(formData);
      await service.save();
      await loadServices();
    } catch (error) {
      setError('Failed to save service');
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      const service = new Service({ ...formData, id });
      await service.save();
      await loadServices();
    } catch (error) {
      setError('Failed to update service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const service = new Service({ id });
        await service.delete();
        await loadServices();
      } catch (error) {
        setError('Failed to delete service');
      }
    }
  };

  const getServiceDetails = (service) => [
    { label: 'Price', value: `$${service.price}` },
    { label: 'Duration', value: `${service.duration_minutes} minutes` }
  ];

  const serviceFields = [
    {
      name: 'name',
      label: 'Service Name',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      multiline: true,
      rows: 3,
      required: true
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      inputProps: { step: "0.01" }
    },
    {
      name: 'duration_minutes',
      label: 'Duration (minutes)',
      type: 'number',
      required: true
    }
  ];

  const serviceColumns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'price', headerName: 'Price', align: 'right' },
    { field: 'duration_minutes', headerName: 'Duration (min)', align: 'right' }
  ];

  const initialFormData = {
    name: '',
    description: '',
    price: '',
    duration_minutes: ''
  };

  return (
    <ManagementSection
      title="Service Management"
      items={services}
      fields={serviceFields}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columns={serviceColumns}
      getDetails={getServiceDetails}
      initialFormData={initialFormData}
      dialogTitle="Service"
    />
  );
} 