import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) {}
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  ngOnInit(): void {
    // this.getHeroes();
    this.heroes = this.heroService.getHeroes();
  }

  selectedHero?: Hero;
  onSelect(hero: any) {
    this.selectedHero = hero;
  }
}

//getHeroes() 메서드를 추가함으로써, service로부터 heroes를 되찾습니다.

//getHeroes() 를 ngOnInit lifecycle hook에서 돌아가게 한다. 앵귤러가 적절한 타임에 ngOnInit()을 실행할 수 있도록.
