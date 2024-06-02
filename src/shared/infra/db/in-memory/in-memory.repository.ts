import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { IRepository } from "../../../domain/repository/repository-interface";
import { ValueObject } from "../../../domain/value-object";

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
  implements IRepository<E, EntityId>
{
  items: E[] = [];
  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }
  async updade(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) => item.entity_id.equals(entity.entity_id));
    if (indexFound === -1) {
      throw new NotFoundError(entity.entity_id, this.getEntity());
    }
    this.items[indexFound] = entity;
  }
  async delete(entity_id: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) => item.entity_id.equals(entity_id));
    if (indexFound === -1) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }
  async findById(entity_id: EntityId): Promise<E> {
    const item: E = this.items.find((item: E) => item.entity_id.equals(entity_id));
    return typeof item === "undefined" ? null : item;
  }
  async findAll(): Promise<any[]> {
    return this.items;
  }
  abstract getEntity(): new (...args: any[]) => E;
}
