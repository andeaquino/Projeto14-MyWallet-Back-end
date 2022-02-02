import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}