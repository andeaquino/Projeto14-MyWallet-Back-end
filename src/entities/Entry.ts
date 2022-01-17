import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("entries")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column({name: 'user_id'})
  userId: number;

  @Column()
  date: string;

  @Column()
  description: string;
    
	@Column()
  value: string;
}