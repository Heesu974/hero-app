import { Component} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {

  selectedHero?: Hero;

  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService) {}

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((ObservableHeroes) => (this.heroes = ObservableHeroes));
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  
  onSelect(hero: any) {
    this.selectedHero = hero;
    this.messageService.add(`Heroescomponent: Selected hero id=${hero.id}`);
  }
}

