export class Barber {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone_number = data.phone_number;
    this.specialties = data.specialties || [];
    this.working_hours = data.working_hours || {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' }
    };
    this.photo_url = data.photo_url;
    this.bio = data.bio;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phone_number: this.phone_number,
      specialties: this.specialties,
      working_hours: this.working_hours,
      photo_url: this.photo_url,
      bio: this.bio
    };
  }

  static fromJSON(json) {
    return new Barber({
      id: json.id,
      firstName: json.firstName,
      lastName: json.lastName,
      phone_number: json.phone_number,
      specialties: json.specialties,
      working_hours: json.working_hours,
      photo_url: json.photo_url,
      bio: json.bio
    });
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
          firstName: this.firstName,
          lastName: this.lastName,
          phone_number: this.phone_number,
          specialties: this.specialties,
          working_hours: this.working_hours,
          photo_url: this.photo_url,
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