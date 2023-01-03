import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { PropertyRead } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

 
  getHeroes(): Observable<Hero[]> {
    const ObservableHeroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
  
    return ObservableHeroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  //getHero도  getHeroes 처럼 비동기 signature이다.

  //이건 mockhero의 observable로써의 mockhero를 반환한다.

}

