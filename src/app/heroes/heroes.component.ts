import { Component} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import {MessageService} from '../message.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {

//The following codes is being tidy things up and state after pruning away the dead code.
heroes: Hero[] = [];

constructor(private heroservice: HeroService){

}
ngOnInit():void {
  this.getHeroes();
}
getHeroes():void {
  this.heroservice.getHeroes().subscribe(heroes => this.heroes = heroes);
}

}



