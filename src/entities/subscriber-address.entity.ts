import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'subscribers_addresses' })
export class SubscribersAddresses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscriber_id: number;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  label: string;

  @Column()
  company: string;

  @Column()
  building: string;

  @Column()
  floor: string;

  @Column()
  area: string;

  @Column()
  street: string;

  @Column()
  landmark: string;

  @Column()
  city_id: number;

  @Column()
  city_name: string;

  @Column()
  province_id: number;

  @Column()
  province_name: string;

  @Column()
  remarks: string;

  @Column()
  is_store_binded: number;

  @Column()
  is_selected: number;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  is_pickup: number;

  @Column()
  full_address: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  deleted_at: Date;
}
