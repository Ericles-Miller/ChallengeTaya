import { Customer, Proposal } from "src/entities/entities.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({})
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
}