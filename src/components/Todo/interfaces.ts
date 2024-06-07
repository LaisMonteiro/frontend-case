import { ReactNode } from "react";

import { ITodoTypes } from "./types";

export interface ILinks {
  name?: string;
  url?: string;
}

export interface ITodo {
  description: ReactNode;
  id: string;
  ref: string;
  required: boolean;
  status: ITodoTypes | string;
  title: string;
  links?: ILinks[];
}
