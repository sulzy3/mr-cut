export class User {
  constructor({
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    role = 'customer', // 'customer', 'barber', or 'admin'
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json) {
    return new User({
      id: json.id,
      email: json.email,
      firstName: json.firstName,
      lastName: json.lastName,
      phoneNumber: json.phoneNumber,
      role: json.role,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }
} 