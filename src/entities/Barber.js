export class Barber {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.specialties = data.specialties || [];
    this.photoUrl = data.photoUrl;
    this.bio = data.bio;
  }

  static async getAll() {
    try {
      const response = await fetch('/api/barbers');
      if (!response.ok) throw new Error('Failed to fetch barbers');
      const data = await response.json();
      return data.map(barber => new Barber(barber));
    } catch (error) {
      console.error('Error fetching barbers:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`/api/barbers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch barber');
      const data = await response.json();
      return new Barber(data);
    } catch (error) {
      console.error('Error fetching barber:', error);
      throw error;
    }
  }

  async save() {
    try {
      const response = await fetch('/api/barbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          phone: this.phone,
          specialties: this.specialties,
          photoUrl: this.photoUrl,
          bio: this.bio,
        }),
      });
      if (!response.ok) throw new Error('Failed to save barber');
      const data = await response.json();
      this.id = data.id;
      return this;
    } catch (error) {
      console.error('Error saving barber:', error);
      throw error;
    }
  }

  async update() {
    try {
      const response = await fetch(`/api/barbers/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          phone: this.phone,
          specialties: this.specialties,
          photoUrl: this.photoUrl,
          bio: this.bio,
        }),
      });
      if (!response.ok) throw new Error('Failed to update barber');
      return this;
    } catch (error) {
      console.error('Error updating barber:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/barbers/${this.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete barber');
    } catch (error) {
      console.error('Error deleting barber:', error);
      throw error;
    }
  }
} 