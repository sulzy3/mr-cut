"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Appointment } from "@/entities/Appointment";
import ManagementSection from "@/components/ManagementSection";
import { format } from "date-fns";

export default function AppointmentsManagementPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const loadAppointments = useCallback(async () => {
    try {
      const userData = JSON.parse(Cookies.get("userData"));
      const appointmentsList = await Appointment.getAll({
        barberId: userData.id,
        date: selectedDate,
      });
      setAppointments(appointmentsList);
      setError(null);
    } catch (error) {
      setError("Failed to load appointments");
    }
  }, [selectedDate]);

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
  }, [loadAppointments, router]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAdd = async (formData) => {
    try {
      await Appointment.create(formData);
      await loadAppointments();
    } catch (error) {
      setError("Failed to save appointment");
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      await Appointment.update(id, formData);
      await loadAppointments();
    } catch (error) {
      setError("Failed to update appointment");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await Appointment.delete(id);
        await loadAppointments();
      } catch (error) {
        setError("Failed to delete appointment");
      }
    }
  };

  const getAppointmentDetails = (appointment) => {
    console.log("appinsmeL:", appointment);
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
      name: "service_id",
      label: "Service",
      type: "select",
      required: true,
      options: [], // This should be populated with available services
    },
  ];

  const appointmentColumns = [
    {
      field: "dateTime",
      headerName: "Date & Time",
      valueGetter: (params) => {
        const appointment = params.row;
        return format(
          new Date(`${appointment.date.split("T")[0]}T${appointment.time}`),
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
    service_id: "",
    barber_id: JSON.parse(Cookies.get("userData"))?.id || "",
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
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!error && appointments.length === 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
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
