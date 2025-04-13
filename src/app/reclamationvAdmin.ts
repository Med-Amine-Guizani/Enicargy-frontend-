
export interface Reclamation {
  id?: number;
  title: string;
  description: string;
  date: string;
  local: string;
  salle: string;
  status: 'En attente' | 'En cours' | 'Terminer';
  photoUrl?: string;
}