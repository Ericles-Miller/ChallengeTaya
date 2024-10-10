import { Proposal } from "src/entities/entities.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.proposals)
  userCreator: User;

  @OneToMany(() => Proposal, (proposal) => proposal.customer)
  proposals: Proposal[];

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  cpf: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  constructor(name: string, cpf: string, userCreator: User) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.cpf = cpf;
    this.userCreator = userCreator;
  }
}