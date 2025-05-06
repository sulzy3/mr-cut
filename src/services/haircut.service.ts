import { BaseService } from '../lib/base.service';
import { query } from '../lib/db';

export class HaircutService extends BaseService {
  constructor() {
    super('services');
  }

  async findByType(type: string) {
    return this.findByProperty('type', type);
  }

  async findByPriceRange(minPrice: number, maxPrice: number) {
    return query(
      `SELECT * FROM ${this.tableName} WHERE price BETWEEN $1 AND $2`,
      [minPrice, maxPrice]
    );
  }
} 