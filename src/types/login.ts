import { TUsersCollection } from './profile';

export interface ILoginResponse {
  total_count: number,
  incomplete_results: boolean,
  items: TUsersCollection
}