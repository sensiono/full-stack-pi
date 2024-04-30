import { User } from "src/app/Models/user/user";

export interface Offre {
    id?: number;
    titre?: string;
    description?: string;
    competenceRequise?: string;
    duree?: string;
    remuneration?: number;
    user?: User;
  }
  