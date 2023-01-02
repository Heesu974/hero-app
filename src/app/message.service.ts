import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
  constructor() { }
}

//이 서비스는 messages의 cache와 두 개의 method를 배출합니다.
//하나는, message를 cache 에 추가하는 것이고,
//다른 하나는 cache를 지우는 것이다.

//이 서비스를 HeroService에 장착(inject)합니다.
