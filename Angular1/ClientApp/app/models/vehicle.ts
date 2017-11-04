import {Model} from "./model.model";
import {Make} from "./make.model";

export class Vehicle {
  id: number;
  model: Model;
  make: Make;
  isRegistered: boolean;
  contact: { name: string, phone: string, email?: string };
  features?: { id: number; name: string }[];
}