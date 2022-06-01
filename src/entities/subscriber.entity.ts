import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'subscribers' })
export class Subscriber extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  brand_id: string;

  @Column()
  psid: string;

  @Column({ select: false })
  psid_hashed: string;

  @Column({ select: false })
  first_name_hashed: string;

  @Column()
  first_name: string;

  @Column({ select: false })
  last_name_hashed: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column()
  mobile_number: number;

  @Column()
  email: string;

  @Column({ select: false })
  email_hashed: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
