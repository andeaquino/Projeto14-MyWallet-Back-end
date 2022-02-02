import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import Category from "./Category";

@Entity("entries")
export default class Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column({name: 'user_id'})
  userId: number;

  @Column()
  date: string;

  @Column()
  description: string;
    
	@Column()
  value: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: "category_id" })
  category: Category;
}