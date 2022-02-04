import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Entry from "./Entry";

@Entity("categories")
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];

  static async findEntries(userId: number) {
    const categoryEntries = await this.createQueryBuilder("categories")
      .leftJoin("categories.entries", "entries")
      .addSelect("SUM(entries.value)", "sum")
      .where("entries.user_id = :id", { id: userId })
      .groupBy("categories.id")
      .getRawMany();

    return categoryEntries;
  }
}
