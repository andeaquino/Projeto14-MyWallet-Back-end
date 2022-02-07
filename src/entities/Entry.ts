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

  static async findFromUser(userId: number) {
    const entries = await Entry.createQueryBuilder("entries")
      .where("user_id = :id", { id: userId })
      .orderBy("entries.date", "DESC")
      .getMany();

    return entries;
  }

  static async findSumFromUser(userId: number) {
    const entriesSum = await Entry.createQueryBuilder("entries")
      .select("SUM(entries.value)", "sum")
      .where("user_id = :id", { id: userId })
      .getRawOne();

    return entriesSum.sum;
  }

  static async findSumPerMonth(userId: number) {
    const entries = await Entry.createQueryBuilder("entries")
      .where("user_id = :id", { id: userId })
      .select("SUM(entries.value)", "sum")
      .addSelect("EXTRACT(MONTH FROM entries.date)", "month")
      .andWhere("entries.date >= date_trunc('year', CURRENT_DATE)")
      .orderBy("month", "DESC")
      .groupBy("month")
      .getRawMany();

    return entries;
  }
}