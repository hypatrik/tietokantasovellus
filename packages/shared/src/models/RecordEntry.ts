import { User } from './User';

export interface RecordEntry {
    id: number;
    user: User;
    createdAt: number;
    type: 'refuel' | 'trip';
}
