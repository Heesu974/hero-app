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

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    const ObservableHeroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    //이때, heroes가 fetch되면, getHeroes() method는 message를 messageService의 add method의 parameter로 넣는다.
    return ObservableHeroes;
  }
}

//**of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.


//***먼저, service-in-service 를 구현하기 위해서, messageService를 HeroesComponent에 장착된 HeroService에 장착합니다. 
//constructor의 parameter에 private로 messageService property를 선언합니다.
//Angular는 HeroService가 생성될 때, MessageService개체를 프로퍼티에 장착합니다. 

//****Send a message from HeroService
// this.messageService.add('HeroService: fetched heroes');
    //이때, heroes가 fetch되면, getHeroes() method는 message를 messageService의 add method의 parameter로 넣는다.

//*****Display the message from HeroService
//the MessagesComponent should display all messages, HeroService에서 보내는 메세지를 포함한 모든 메세지.
