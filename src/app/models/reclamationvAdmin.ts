
export interface Reclamation {
  id?: number;
  titre: string;
  description: string;
  date: string;
  local: string;
  salle: string;
  status: 'En_Attente' | 'En_cours' | 'Terminer';
  photoUrl?: string;
}