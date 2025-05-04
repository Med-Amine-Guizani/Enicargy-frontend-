import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { EnicargyDashboardService } from '../../services/enicargy-dashboard.service';
import { ReclamationsService } from '../../services/reclamations.service';
import { TokenService } from '../../services/TokenService';


interface MonthlyStat {
  mois: string;
  total: number;
  terminees: number;
}


@Component({
  selector: 'app-enicargy-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicargy-dashboard.component.html',
  styleUrls: ['./enicargy-dashboard.component.scss']
})
export class EnicargyDashboardComponent implements OnInit, AfterViewInit {
  chartConsommation!: Chart;
  chartReclamation!: Chart;
  chartParticipation!: Chart;
  
  //champs pour afficher le nb de reclamation par user role
  etudiantCount: number = 0;
  enseigneantcount: number = 0;
  personnelcount: number = 0;
  
   //champs pour afficher le nb de reclamation par status
   enAttente: number = 0;
   terminée: number = 0;
   enCours: number = 0;

  consommationData: { electricite: number[]; eau: number[] } = { electricite: [], eau: [] };
  reclamationData: { total: number[]; terminee: number[] } = { total: [], terminee: [] };
  participationData: { name: string; value: number; color: string }[] = [];

  monthlyStats: MonthlyStat[] = [];

  mois = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

  constructor(private dashboardService: EnicargyDashboardService,
    private reclamationService: ReclamationsService,
    public tokenService: TokenService) {
    
    Chart.register(...registerables);
    console.log('EnicargyDashboardComponent constructor called'); // LOG
  }

  ngOnInit(): void {
    console.log('ngOnInit called'); // LOG
    this.dashboardService.getConsommationData().subscribe(
      data => {
        this.consommationData = data;
        console.log("Données reçues dans le composant :", this.consommationData); // LOG
        this.initConsommationChart();
      },
      error => {
        console.error("Erreur lors de la récupération des données de consommation :", error); // LOG
      }
    );

    this.dashboardService.getReclamationData().subscribe(
      data => {
        this.reclamationData = data;
  
      },
      error => {
        console.error("Erreur lors de la récupération des données de réclamation :", error); // LOG
      }
    );

    this.dashboardService.getParticipationData().subscribe(
      data => {
        this.participationData = data
      },
      error => {
        console.error("Erreur lors de la récupération des données de participation :", error); // LOG
      }
    );

    const token=this.tokenService.getToken();
    if(token!==null){
      this.reclamationService.getReclamationCountsByUserRole().subscribe((reclamationcount:any)=>{
        //stockage pour affichage
        this.etudiantCount = reclamationcount.etudiant;
        this.enseigneantcount = reclamationcount.enseigneant;
        this.personnelcount = reclamationcount.personnel;

        const chartData = this.convertStatsToChartData(reclamationcount);
        this.initParticipationChart(chartData);
      })

      // Appel à l'API qui retourne List<MonthlyReclamationDTO>
    this.reclamationService.getReclamationByMonth().subscribe((data: MonthlyStat[]) => {
      this.monthlyStats = data;
      const chartData = this.buildChartData(data);
      this.initReclamationChart(chartData);
    });
    }
  }

  private buildChartData(stats: MonthlyStat[]) {
    // On aligne les données sur les 12 mois
    const labels   = this.mois;
    const total    = new Array<number>(12).fill(0);
    const terminees = new Array<number>(12).fill(0);

    stats.forEach(s => {
      // trouve l'indice du mois (Janvier => 0, Févr. => 1, ...)
      const idx = this.mois.findIndex(m => m.startsWith(s.mois.substr(0, 3)));
      if (idx >= 0) {
        total[idx]     = s.total;
        terminees[idx] = s.terminees;  // ou `s.terminees` selon orthographe
      }
    });

    return { labels, total, terminees };
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called'); // LOG
  }

  initConsommationChart(): void {
    console.log("initConsommationChart called"); // LOG
    console.log("Données utilisées pour le graphique de consommation :", this.consommationData.electricite, this.consommationData.eau); // LOG
    const canvas = document.getElementById('consommationChart') as HTMLCanvasElement;
    console.log("Canvas element:", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context:", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'consommationChart'"); // LOG
      return;
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.mois,
        datasets: [
          {
            label: 'Électricité en (kWh)',
            data: this.consommationData.electricite,
            borderColor: '#3f51b5',
            backgroundColor: '#3f51b580',
            fill: true
          },
          {
            label: 'Eau en (m3)',
            data: this.consommationData.eau,
            borderColor: '#4caf50',
            backgroundColor: '#4caf5080',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Consommation par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    this.chartConsommation = new Chart(ctx, config);
    console.log("chartConsommation initialized:", this.chartConsommation); // LOG
  }

  initReclamationChart(data: { labels: string[]; total: number[]; terminees: number[] }): void {
    // Logs pour le graphique de réclamation (similaires à initConsommationChart)
    console.log("initReclamationChart called"); // LOG
    console.log("Données utilisées pour le graphique de réclamation :", this.reclamationData); // LOG
    const canvas = document.getElementById('reclamationChart') as HTMLCanvasElement;
    console.log("Canvas element (reclamationChart):", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context (reclamationChart):", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'reclamationChart'"); // LOG
      return;
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Réclamations totales',
            data: data.total,
            backgroundColor: '#4040FF',
            barPercentage: 0.9,
            categoryPercentage: 0.8
          },
          {
            label: 'Réclamations terminées',
            data: data.terminees,
            backgroundColor: '#FF8000',
            barPercentage: 0.9,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Variation de réclamation par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right'
          }
        },
        scales: {
          y: {
            max: 25,
            beginAtZero: true
          }
        }
      }
    };

    this.chartReclamation = new Chart(ctx, config);
    console.log("chartReclamation initialized:", this.chartReclamation); // LOG
  }


  convertStatsToChartData(status:any):{
        labels:string[];
        values:number[];
        colors:string[];
  }{
    const labels=[
      `Etudiant(${this.etudiantCount})`,
      `Enseigneant(${this.enseigneantcount})`,
      `Personnel(${this.personnelcount})`
    ];
    const values=[this.etudiantCount, this.enseigneantcount, this.personnelcount];
    const colors=["#33D69F","#FF4C61","#FFB800"];
    return { labels, values, colors };
  }

  initParticipationChart(data :{labels:string[], values: number[], colors: string[]}): void {
    // Logs pour le graphique de participation (similaires aux autres)
    console.log("initParticipationChart called"); // LOG
    console.log("Données utilisées pour le graphique de participation :", this.participationData); // LOG
    if(typeof window === undefined) return ;
    const canvas = document.getElementById('participationChart') as HTMLCanvasElement;
    console.log("Canvas element (participationChart):", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context (participationChart):", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'participationChart'"); // LOG
      return;
    }

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data:data.values,
            backgroundColor: data.colors,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Participation par statut',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              boxWidth: 12,
              padding: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = context.dataset.data
                  .filter((item): item is number => typeof item === 'number')
                  .reduce((a, b) => a + b, 0);
                const value = context.raw as number;
                const percentage = Math.round(((value as number) / (Number(total) || 1)) * 100);
                return `${context.label}: ${percentage}%`;
              }
            }
          }
        }
      }
    };

    this.chartParticipation = new Chart(ctx, config);
    console.log("chartParticipation initialized:", this.chartParticipation); // LOG
  }
}