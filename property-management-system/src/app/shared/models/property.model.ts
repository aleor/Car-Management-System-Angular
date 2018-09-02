import { State } from "./state.model";
import { Booking } from "./booking.model";

export class Property {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: State;
    orders?: Booking[];
    orderTotal?: number;
    latitude?: number;
    longitude?: number;
}