
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  searchQuery = signal('');
  
  articles = signal([
    {
      id: 1,
    title: "L'Eau, une Ressource Précieuse à Préserver",
    excerpt: "L'eau est une ressource vitale, mais limitée...", // Extrait court
    externalUrl: "http://www.agriculture-biodiversite-oi.org/Nature-agriculture/Nouvelles-du-terrain/Environnement-et-biodiversite/Preserver-les-ressources-naturelles/L-eau-une-ressource-rare-et-precieuse"
    },
    {
      id: 2,
      title: "Énergies renouvelables",
      excerpt: "Le solaire tunisien pourrait couvrir 30% des besoins énergétiques d'ici 2030...",
      externalUrl: "https://www.anme.tn/energies-renouvelables"
    },
    {
      id: 3,
      title: "Le Tri des Déchets, un Petit Geste pour un Grand Changement",
      content: "Le tri des déchets est un acte citoyen essentiel pour préserver nos ressources naturelles. En recyclant le verre, le plastique et le papier, nous réduisons la pollution et limitons l'exploitation de nouvelles matières premières. Chaque déchet tiré est un pas vers un avenir plus durable.",
      date: new Date('2024-04-10')
    },
    {
      id: 4,
      title: "Le Climat en Danger : Agissons Maintenant",
      content: "Le changement climatique menace nos ressources naturelles. En réduisant notre empreinte carbone (transports, chauffage, consommation), nous pouvons limiter les dégâts. Chaque action compte : privilégions les transports en commun, isolons nos logements et soutenons les initiatives écologiques.",
      date: new Date('2024-07-05'),
      auteur: "Redige par ABDELLI Ameni 2eme genie INFO"
    },
    {
      id: 5,
      title: "La Biodiversité, un Équilibre Fragile",
      content: "La biodiversité est essentielle à la survie de notre écosystème. En protégeant les habitats naturels, en évitant la surpêche et en luttant contre la pollution, nous préservons les ressources naturelles dont nous dépendons. Respectons la nature pour obtenir l'équilibre de la vie.",
      date: new Date('2024-03-18')
    }
  ]);

  filteredArticles = signal(this.articles());

  updateSearch(): void {
    const query = this.searchQuery().toLowerCase();
    this.filteredArticles.set(
      this.articles().filter(article => 
        article.title.toLowerCase().includes(query) || 
        (article.excerpt ?? '').toLowerCase().includes(query)
      || (article.content ?? '').toLowerCase().includes(query) ||
        (article.date ? article.date.toLocaleDateString().includes(query) : false)
      )
    );
  }
}