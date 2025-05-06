import { query } from './db';

export class BaseService {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll() {
    return query(`SELECT * FROM ${this.tableName}`);
  }

  async findById(id: number) {
    return query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
  }

  async findByProperty(property: string, value: any) {
    return query(`SELECT * FROM ${this.tableName} WHERE ${property} = $1`, [value]);
  }

  async create(data: Record<string, any>) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    return query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
  }

  async update(id: number, data: Record<string, any>) {
    const setClause = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    return query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...Object.values(data)]
    );
  }

  async delete(id: number) {
    return query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  }
} 