export class Customer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.notes = data.notes;
  }

  static async getAll() {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      return data.map(customer => new Customer(customer));
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`/api/customers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch customer');
      const data = await response.json();
      return new Customer(data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async save() {
    try {
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id ? `/api/customers/${this.id}` : '/api/customers';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          phone: this.phone,
          notes: this.notes
        }),
      });

      if (!response.ok) throw new Error('Failed to save customer');
      const data = await response.json();
      return new Customer(data);
    } catch (error) {
      console.error('Error saving customer:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/customers/${this.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete customer');
      return true;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
} 