import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ProposalStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  REFUSED = 'REFUSED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}





@Entity({ name: 'proposals' })
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.proposals)
  userCreator: User;

  @ManyToOne(() => Customer, (customer) => customer.proposals)
  customer: Customer;

  @Column({ nullable: false, type: 'decimal', default: 0 })
  profit: number;

  @Column({
    nullable: false,
    type: 'varchar',
    default: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;
}
