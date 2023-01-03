import { Component } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes: Hero[] = [];
  //Hero 데이터 타입을 가져오고, 빈 배열이다.


  constructor(private heroService: HeroService) {

  }

  //constructor expects Angulat to inject the HeroService into a private heroService property

  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5));
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
