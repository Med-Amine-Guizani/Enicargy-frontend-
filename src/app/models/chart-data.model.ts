 export interface ConsumptionData {
    month: string;
    electricite: number;
    eau: number;
  }
  
  export interface ReclamationData {
    enAttente:number;
    enCours: number;
    terminee: number;
  }
  
  export interface UtilisationStats {
    utilisateurs: number;
    eau: number;
    electricite: number;
    max: number;
    min: number;
    reclamations: number
  }