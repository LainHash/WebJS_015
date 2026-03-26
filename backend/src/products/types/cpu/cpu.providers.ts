import { DataSource } from 'typeorm';
import { Cpu } from './entities/cpu.entity';

export const cpuProviders = [
  {
    provide: 'CPU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cpu),
    inject: ['DATA_SOURCE'],
  },
];
