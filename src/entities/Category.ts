import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Entry from "./Entry";

@Entity("categories")
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];

  static async findEntries(userId: number) {
    const categoryEntries = await this.createQueryBuilder("categories")
      .leftJoinAndSelect("categories.entries", "entries")
      .where("entries.user_id = :id", { id: userId })
      .getMany();

    return categoryEntries;
  }
}
