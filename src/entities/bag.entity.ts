import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'Bags' })
export class Bag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand_id: number;

  @Column()
  store_id: number;

  @Column()
  subscriber_id: number;

  @Column()
  status: number;

  @Column()
  order_type: string;

  @Column()
  order_time: Date;

  @Column()
  order_time_schedule: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  deleted_at: Date;
}
