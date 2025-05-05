export interface Equipement {
  id: number;
  type: string;
  //image: string;   // chemin local vers l'image
  total: number;
  bon: number;      // correspond à "good" dans la structure du backend
  enReparation: number;  // correspond à "repair"
  enPanne: number;      // correspond à "broken"
  reserve: number;
  isEditing?: boolean; 
}