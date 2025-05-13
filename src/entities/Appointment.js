export class Appointment {
  constructor(data) {
    this.id = data.id;
    this.customerName = data.customerName;
    this.customerPhone = data.customerPhone;
    // // Handle both combined dateTime and separate date/time fields
    // if (data.dateTime) {
    //   this.dateTime = data.dateTime;
    // } else if (data.date && data.time) {
    //   this.dateTime = `${data.date}T${data.time}`;
    // } else {
    //   this.dateTime = new Date().toISOString(); // Fallback to current time
    // }
    this.date = data.date;
    this.time = data.time;
    this.serviceId = data.serviceId;
    this.barberId = data.barberId;
    this.status = data.status;
  }

  static async getAll() {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      return data.map(appointment => new Appointment(appointment));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      if (!response.ok) throw new Error('Failed to fetch appointment');
      const data = await response.json();
      return new Appointment(data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  }

  async save() {
    try {
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id ? `/api/appointments/${this.id}` : '/api/appointments';

      const now  = new Date().toISOString();
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // customer_name: this.customerName,
          id: `${this.customerPhone}-${this.barberId}-${this.date}`,
          date: this.date,
          time: this.time,
          service_id: this.serviceId,
          barber_id: this.barberId,
          status: 'pending',
          created_at: now,
          updated_at: now,
        }),
      });

      if (!response.ok) throw new Error('Failed to save appointment');
      const data = await response.json();
      return new Appointment(data);
    } catch (error) {
      console.error('Error saving appointment:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/appointments/${this.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete appointment');
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
} 