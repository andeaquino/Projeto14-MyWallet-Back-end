import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import Category from "./Category";

@Entity("entries")
export default class Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  date: Date;

  @Column()
  description: string;
    
  @Column("decimal", { scale: 2 })
  value: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: "category_id" })
  category: Category;

  static async createNew(userId: number, description: string, value: number, categoryName: string) {
    const category = await Category.findOne({ name: categoryName });
    const date = new Date();

    const newEntry = this.create({ userId, date, description, value, category });
    await newEntry.save();

    return newEntry;
  }

  static async findUserEntriesSum(userId: number) {
    const entriesSum = await Entry.createQueryBuilder("entries")
      .select("SUM(entries.value)", "sum")
      .where("user_id = :id", { id: userId })
      .getRawOne();

    return entriesSum.sum;
  }
}