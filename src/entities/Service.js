export class Service {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.duration = data.duration; // in minutes
  }

  static async getAll() {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      return data.map(service => new Service(service));
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`/api/services/${id}`);
      if (!response.ok) throw new Error('Failed to fetch service');
      const data = await response.json();
      return new Service(data);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  }

  async save() {
    try {
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id ? `/api/services/${this.id}` : '/api/services';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          price: this.price,
          duration: this.duration
        }),
      });

      if (!response.ok) throw new Error('Failed to save service');
      const data = await response.json();
      return new Service(data);
    } catch (error) {
      console.error('Error saving service:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/services/${this.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete service');
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
} 