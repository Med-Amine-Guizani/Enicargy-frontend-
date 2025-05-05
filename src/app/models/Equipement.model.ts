export interface Equipement {
  id: number;
  type: string;
  total: number;
  bon: number;     
  enReparation: number;  
  enPanne: number;     
  reserve: number;
  isEditing?: boolean; 
}