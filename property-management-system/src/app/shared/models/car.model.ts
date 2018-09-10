import { HistoryRecord } from './history-record.model';

export class Car {
    id: number;
    model: string;
    type: string;
    isAvailable: boolean;
    isDamaged: boolean;
    totalBalance: number;
    picture: string;
    age: number;
    location: {
      latitude: number;
      longitude: number;
    };
    address: {
      city: string;
      state: string;
      country: string;
      street: string;
      zip: number;
      building: number;
    };
    country: string = 'US';
    description: string;
    registeredAt: Date;
    comments: string[];
    history: HistoryRecord[]
}