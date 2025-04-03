import { StatutReclamation } from "./pages/add-claim/add-claim.component";

export interface Reclamation {
  location: string;        // Lieu de la réclamation
  ressource: string;       // Ressource concernée
  probleme: string;        // Type de problème
  description: string;     // Détails du problème
  dateClaim: Date;         // Date de la réclamation
  statut: StatutReclamation; // Statut de la réclamation (enum)
  score: number;           // Score de la réclamation
}
