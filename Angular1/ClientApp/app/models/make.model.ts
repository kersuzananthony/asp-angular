import {Model} from "./model.model";

export interface Make {
  id: number;
  name: string;
  models: Model[];
}