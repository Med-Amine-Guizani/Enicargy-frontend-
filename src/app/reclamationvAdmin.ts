
export interface Reclamation {
  id?: number;
  title: string;
  description: string;
  date: string;
  local: string;
  salle: string;
  state: 'En attente' | 'En cours' | 'Terminer';
  photoUrl?: string;
}