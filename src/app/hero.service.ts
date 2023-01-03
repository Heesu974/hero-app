import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { PropertyRead } from '@angular/compiler';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'
  //api는 :base/:collectionName 중, base에 해당하며, 어떤 종류의 요청인지 구별하는 변수이고,
  //heroes는 :base/:collectionname 중, collectionname에 해당하며, in-memory-data-service.ts 파일에 있는 콜렉션을 구별합니다.
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {}
//HeroService의 생성자에서 HttpClient를 http 프로퍼티로 inject
 
  // getHeroes(): Observable<Hero[]> {
  //   const ObservableHeroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  
  //   return ObservableHeroes;
  // }
  //이 방법은 mock data를 ts 파일로 만들어 놓고 서버.get 흉내내려고, mock data에서 바인딩을 비동기 처리 해놓은거 

  //여기서는 진짜 서버로 data 요청하는거

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
//이건 HeroService가 getHeroes()라는 함수를 통해서, http 서버에서 Hero 데이터를 받아와서 옵저블화 하는거임.
//그리고나서, getHeroes()를 사용하면서 subscribe하면 이 옵저블 데이터를 사용하는것.

 //이제 이 단계를 거치면서 목 서버에서 데이터를 받아옴 
 //기존에 쓰였던 of 함수가 get으로 치환된 겁니다.
 //0of가 하는일이 리모트 서버를 거치지 않과, 데이터를 즉시 추출해주는 것.

  getHero(id: number): Observable<Hero> {

    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.
  
      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);
  
      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}
//HTTP는 요청과 응답으로 구성되는 프로토콜입니다.
//따라서 요청이 한 번이면 응답도 한 번입니다.



