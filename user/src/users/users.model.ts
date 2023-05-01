import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttr {
  email: string;
  password: string;
  phoneNumber: number;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.STRING, defaultValue: null})
  phoneNumber: number;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

}