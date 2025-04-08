export class Barber {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.specialties = data.specialties || [];
    this.workingHours = data.workingHours || {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' }
    };
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
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id ? `/api/barbers/${this.id}` : '/api/barbers';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          phone: this.phone,
          specialties: this.specialties,
          workingHours: this.workingHours,
          photoUrl: this.photoUrl,
          bio: this.bio,
        }),
      });

      if (!response.ok) throw new Error('Failed to save barber');
      const data = await response.json();
      return new Barber(data);
    } catch (error) {
      console.error('Error saving barber:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const response = await fetch(`/api/barbers/${this.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete barber');
      return true;
    } catch (error) {
      console.error('Error deleting barber:', error);
      throw error;
    }
  }
} 