export class Barber {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.first_name || data.firstName;
    this.lastName = data.last_name || data.lastName;
    this.phoneNumber = data.phone_number || data.phoneNumber;
    this.specialties = data.specialties || [];
    this.workingHours = data.workingHours;

    this.bio = data.bio;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      specialties: this.specialties,
      working_hours: this.workingHours,
      bio: this.bio
    };
  }

  static fromJSON(json) {
    return new Barber({
      id: json.id,
      firstName: json.firstName,
      lastName: json.lastName,
      phoneNumber: json.phone_number,
      specialties: json.specialties,
      workingHours: json.workingHours,
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
      const method = this.id ? 'PUT' : 'POST';
      const url = this.id ? `/api/barbers/${this.id}` : '/api/barbers';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.firstName,
          last_name: this.lastName,
          phone_number: this.phoneNumber,
          specialties: this.specialties,
          working_hours: this.workingHours,
          bio: this.bio,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      return new Barber(data);
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