import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { PropertyRead } from '@angular/compiler';

//1. Http 심볼 로드
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {catchError, map, tap} from 'rxjs/operators';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  //heroesUrl을 :base/:collectionName과 같은 형태로 정의합니다.
  //이 주소는 서버의 리소스 위치에 따라 달라질 수 있다.
  //이 주소에서 base는 어떤 종류의 요청인지 구별하는 변수이고,
  //collectionName은 in-memory-data-service 파일에 있는 콜랙션을 구별하는 변수입니다.
  private heroesUrl = 'api/heroes';
  //웹 API 형식의 URL로 사용합니다.


 
  //2. HeroService의 생성자에서 HttpClient를 http 프로퍼티로 주입합니다.
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ){}
  //2-1. MessageService도 의존성으로 주입되지만, 
  //이 서비스는 가끔 사용하기 때문에 private log()메소드로 랩핑합니다.



    //GET: 서버에서 히어로 목록을 가져옵니다.
    //<Hero[]> 타입을 갖는  Observable 기계의 이름이 getHeroes() 이고, 
    //이 기계는 다음과 같은 값을 반환한다.
    //get을 통해 HTTP로 부터 <Hero[]> 타입의 데이터를 받고, 
  //이 데이터를 받는데 실패하면, catchError로 로직을 옮기고, 
  //성공하면, tap 을 통해서 사용자한테 보여준다.
    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }

getHero(id:number):Observable<Hero>{
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  )
  
}
//<Hero[]> 면, 배열 형태의 데이터를 받아오는 거고, <Hero> 면 데이터 하나만 가져오는 거고, 그릏다.
//따라서 getHero()는,
//Hero 타입의 데이터를 반환하는Observable이라는 함수이고 , 그 이름이 getHero 인 것이다.


  updateHero(hero: Hero):Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result? :T){
    return (error: any): Observable<T> => {

      console.error(error) 
 
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
     

    }
  }


}

//heroesURL에 기본 URL 과 히어로 id에 해당하는 숫자를 사용해서 api/heroes/11라는 주소로 히어로 데이터를 요청하는 것이 목표입니다.









