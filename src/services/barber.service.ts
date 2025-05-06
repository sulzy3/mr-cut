import { BaseService } from '../lib/base.service';
import { query } from '../lib/db';

export class BarberService extends BaseService {
  constructor() {
    super('barbers');
  }

  async findBySpecialty(specialty: string) {
    return this.findByProperty('specialty', specialty);
  }

  async findAvailableBarbers(date: string, time: string) {
    return query(
      `SELECT b.* FROM ${this.tableName} b 
       WHERE b.id NOT IN (
         SELECT a.barber_id FROM appointments a 
         WHERE a.date = $1 AND a.time = $2
       )`,
      [date, time]
    );
  }
} 