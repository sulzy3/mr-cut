"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Appointment } from "@/entities/Appointment";
import ManagementSection from "@/components/ManagementSection";
import { format } from "date-fns";
import {Service} from '@/entities/Service';

export default function AppointmentsManagementPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const loadAppointments = useCallback(async () => {
    try {
      const appointmentsList = await Appointment.getAll({
        date: selectedDate,
      });
      setAppointments(appointmentsList);
      setError(null);
    } catch (error) {
      setError("Failed to load appointments");
    }
  }, [selectedDate]);

  const loadServices = async () => {
    try {
      const servicesList = await Service.getAll();
      setServices(servicesList?.map((service)=>({value: service.id, label: service.name})));
    } catch (error) {
      setError('Failed to load services');
    }
  };

  useEffect(() => {
    const userData = Cookies.get("userData");
    if (!userData) {
      router.push("/");
      return;
    }

    const { userType } = JSON.parse(userData);
    if (userType !== "barber" && userType !== "admin") {
      router.push("/dashboard");
      return;
    }

    loadAppointments();
    loadServices();
  }, [loadAppointments, router]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAdd = async (formData) => {
    try {
      await new Appointment(formData).save();
      await loadAppointments();
    } catch (error) {
      setError("Failed to save appointment");
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      await new Appointment({ ...formData, id }).save();
      await loadAppointments();
    } catch (error) {
      setError("Failed to update appointment");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await new Appointment({ id }).delete();
        await loadAppointments();
      } catch (error) {
        setError("Failed to delete appointment");
      }
    }
  };

  const getAppointmentDetails = (appointment) => {
    return [
      {
        label: "Appointment Time",
        value: format(
          new Date(`${appointment.date.split("T")[0]}T${appointment.time}`),
          "h:mm a"
        ),
      },
      {
        label: "Barber",
        value: appointment.barber?.firstName 
          ? `${appointment.barber.firstName} ${appointment.barber.lastName}`
          : "N/A",
      },
      {
        label: "Service",
        value: appointment.service?.name || "N/A",
      },
      {
        label: "Duration",
        value: appointment.service?.duration_minutes 
          ? `${appointment.service.duration_minutes} minutes`
          : "N/A",
      },
      {
        label: "Price",
        value: appointment.service?.price 
          ? `$${appointment.service.price}`
          : "N/A",
      },
      {
        label: "Status",
        value: appointment.status 
          ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
          : "N/A",
      }
    ];
  };

  const appointmentFields = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "time",
      label: "Time",
      type: "time",
      required: true,
    },
    {
      name: "serviceId",
      label: "Service",
      type: "select",
      required: true,
      options: services, // This should be populated with available services
    },
  ];

  const appointmentColumns = [
    {
      field: "dateTime",
      headerName: "Date & Time",
      valueGetter: (params) => {
        const appointment = params.row;
        return format(
          new Date(`${appointment.date}T${appointment.time}`),
          "PPp"
        );
      },
    },
    {
      field: "service",
      headerName: "Service",
      valueGetter: (params) => {
        const service = params.row.service;
        return service?.name || "N/A";
      },
    },
    {
      field: "price",
      headerName: "Price",
      valueGetter: (params) => {
        const service = params.row.service;
        return service?.price ? `$${service.price}` : "N/A";
      },
      align: "right",
    },
    {
      field: "duration",
      headerName: "Duration",
      valueGetter: (params) => {
        const service = params.row.service;
        return service?.duration_minutes ? `${service.duration_minutes} min` : "N/A";
      },
      align: "right",
    },
    {
      field: "barber",
      headerName: "Barber",
      valueGetter: (params) => {
        const barber = params.row.barber;
        return barber?.firstName ? `${barber.firstName} ${barber.lastName}` : "N/A";
      },
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params) => {
        const status = params.row.status;
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A";
      },
    },
  ];

  const initialFormData = {
    date: selectedDate,
    time: "",
    serviceId: "",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div style={{color:'red'}}>
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!error && appointments.length === 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                No appointments scheduled for{" "}
                {format(new Date(selectedDate), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      )}

      <ManagementSection
        title=""
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
    </div>
  );
}
