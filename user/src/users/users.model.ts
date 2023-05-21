import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";


interface UserCreationAttr {
  email: string;
  password: string;
  phoneNumber: string;
  isActivated: boolean;
  activationLink: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true, defaultValue: null })
  phoneNumber: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING})
  activationLink: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

}