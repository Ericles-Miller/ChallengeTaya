import { Customer } from "src/customers/entities/customer.entity";
import { Proposal } from "src/entities/entities.entity";
import { 
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Customer, (customer) => customer.userCreator)
  createdCustomers: Customer[];

  @OneToMany(() => Proposal, (proposal) => proposal.userCreator)
  proposals: Proposal[];

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'decimal', default: 0 })
  balance: number;

  @CreateDateColumn({ type: 'datetime', })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime',  })
  updatedAt?: Date;

  constructor(name: string, balance: number) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.balance = balance;
  }
}