import { Bag } from 'src/entities/bag.entity';
import { SubscribersAddresses } from 'src/entities/subscriber-address.entity';
import { Subscriber } from 'src/entities/subscriber.entity';

export const config = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Subscriber, Bag, SubscribersAddresses],
    keepConnectionAlive: true,
    synchronize: false,
    logging: 'all',
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  },
});
