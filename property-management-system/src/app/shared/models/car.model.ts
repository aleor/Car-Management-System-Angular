import { HistoryRecord } from "./history-record.model";

export class Car {
    _id: string;
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
    address: string;
    country: string = 'US';
    description: string;
    registeredAt: Date;
    comments: string[];
    history: HistoryRecord[]
}