import { DataSource } from 'typeorm';
import { Laptop } from './entities/laptop.entity';

export const laptopProviders = [
  {
    provide: 'LAPTOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Laptop),
    inject: ['DATA_SOURCE'],
  },
];
