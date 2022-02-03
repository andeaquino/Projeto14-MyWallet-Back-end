import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import bcrypt from "bcrypt";
import ConflictError from "../errors/ConflictError";

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

  static async createNew(name: string, email: string, password: string) {
    const user = await this.findOne({ email });

    if(user) {
      throw new ConflictError("Email já está cadastrado!");
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = this.create({ name, email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }
}