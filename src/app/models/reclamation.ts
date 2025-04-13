import { StatutReclamation } from "../pages/add-claim/add-claim.component";

export type RessourceType = 'Eau' | 'Électricité' | 'Logistique' | null;

export interface Reclamation {
  location: string;
  ressource: RessourceType;
  probleme: string;
  description: string;
  dateClaim: Date;
  statut: StatutReclamation;
  photo: File | null;
}
