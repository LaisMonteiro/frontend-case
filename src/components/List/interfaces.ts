import { ETransaction } from "./enums";

export interface ITransaction {
  amount: number; //in cents
  dateEvent: string; //ex: 2024-01-11T14:47:46Z
  description: string;
  entry: ETransaction;
  id: string;
  label: string;
  name: string;
  status: string;
}

export interface ITransactions {
  date: string; //ex: 2024-02-01
  items: ITransaction[];
}

export interface IResponseList {
  itemsTotal: number;
  results: ITransactions[];
}
