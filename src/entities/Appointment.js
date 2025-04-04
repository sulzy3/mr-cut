export class Appointment {
  constructor(data) {
    this.id = data.id;
    this.serviceId = data.serviceId;
    this.barberId = data.barberId;
    this.date = data.date;
    this.time = data.time;
    this.customerName = data.customerName;
    this.customerPhone = data.customerPhone;
    this.customerEmail = data.customerEmail;
    this.status = data.status || 'pending'; // pending, confirmed, cancelled, completed
    this.notes = data.notes || '';
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

  static async getByBarber(barberId) {
    try {
      const response = await fetch(`/api/appointments/barber/${barberId}`);
      if (!response.ok) throw new Error('Failed to fetch barber appointments');
      const data = await response.json();
      return data.map(appointment => new Appointment(appointment));
    } catch (error) {
      console.error('Error fetching barber appointments:', error);
      throw error;
    }
  }

  static async getByDate(date) {
    try {
      const response = await fetch(`/api/appointments/date/${date}`);
      if (!response.ok) throw new Error('Failed to fetch appointments by date');
      const data = await response.json();
      return data.map(appointment => new Appointment(appointment));
    } catch (error) {
      console.error('Error fetching appointments by date:', error);
      throw error;
    }
  }

  async save() {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: this.serviceId,
          barberId: this.barberId,
          date: this.date,
          time: this.time,
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          customerEmail: this.customerEmail,
          status: this.status,
          notes: this.notes,
        }),
      });
      if (!response.ok) throw new Error('Failed to save appointment');
      const data = await response.json();
      this.id = data.id;
      return this;
    } catch (error) {
      console.error('Error saving appointment:', error);
      throw error;
    }
  }

  async update() {
    try {
      const response = await fetch(`/api/appointments/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: this.serviceId,
          barberId: this.barberId,
          date: this.date,
          time: this.time,
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          customerEmail: this.customerEmail,
          status: this.status,
          notes: this.notes,
        }),
      });
      if (!response.ok) throw new Error('Failed to update appointment');
      return this;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/appointments/${this.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete appointment');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  async confirm() {
    this.status = 'confirmed';
    return this.update();
  }

  async cancel() {
    this.status = 'cancelled';
    return this.update();
  }

  async complete() {
    this.status = 'completed';
    return this.update();
  }
} 