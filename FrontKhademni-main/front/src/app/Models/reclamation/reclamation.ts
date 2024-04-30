import { User } from "../user/user";

export enum ReclamationType {
    WEBSITE_BUG ,
    PAYMENT_ISSUE ,
    PURCHASE_ISSUE,
  }
  
  export interface Reclamation {
    idRec: number;
    description: string;
    etat: string;
    type: ReclamationType | null; // Updated to accept null as a valid type
    user: User;
    createdAt: Date;
  }
  
