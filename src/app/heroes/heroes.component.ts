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
//목표 - dashboard view를 만들어 봅시다. 
//ability to navigate Heroes와 대시보드 사이에서의 navigate 기능을 만들어 봅시다. 
// 유저가 hero name을 클릭 할 때. 선택된 히로의 디테일 페이지로 navigate 합시다.

//Add the AppRoutingModulae
//AppRoutingModule을 추가하는 가장 좋은 방법은, 
//가장 좋은 방법은 라우터를 분리되어 있는 상위 레벨의 모듈에 라우터를 로드하고 설정하는 것입니다. 

//이 라우터는 routing에만 집중하고 root AppModule에 import 되어 있습니다.

//통상적으로, module class는 AppRoutingModule이고, app-routing.module.ts에 적힙니다.


