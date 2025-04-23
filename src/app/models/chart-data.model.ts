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
  export interface Rapport {
    id : number ;
    title : string ;
    date : string ;
}

export interface Article {
    id : number ;
    title : string ;
    text : string ;
}