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

    //중요한거, HttpClient.get 함수는 HTTP 응답으로 받은 몸체(body)를 반환하는데, 이 객체는 타입이 지정되지 않은 json 객체로 반환되기 때문에, <Hero[]> 같은 제네릭을 지정해주는 겁니다.
    // 따라서, Observable에 <Hero[]>와 같은 타입을 지정해서 데이터를 받아올 수 있도록 하는거.
    //이 코드를 통해서 이제 목서버에서 히어로 데이터를 받을 수 있습니다.
  //2. HttpClient 로 히어로 목록을 가져와 봅시다. 
  //지금까지 HeroService.getHeroes() 메소드는 히어로 목록 목 데이터를 Observable<Hero[]>타입으로 반환하기 위해 Rxjs of()함수를 이용했다.

  //옵저버블은 데이터 값을 발행하는 함수이다. 따라서 Observable<Hero[]> 라서 선언이 되어 있으면, 
  //이는 <Hero[]>에 대한 데이터 값을 발행하는 함수를 생성했다는 것.

  //이 옵저버블은 함수가 데이터를 얻는 기계라고 한다면, 이 기계를 사용할 "구독자"가 반드시 필요하다. 좀 기억해라.


 //id로 히어로 데이터 가져오기
//** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다.
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

  //PUT: 서버에 저장된 히어로 데이터를 "변경"합니다. 
  updateHero(hero: Hero):Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
 //바로 httpClient를 사용해서 데이터를 처리해봅시다.
  

  //HeroService에서 보내는 메세지는 MessageService가 화면에 표시합니다.
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result? :T){
    return (error: any): Observable<T> => {
      //T라는 타입을 갖는 Observable 함수의 생성
      console.error(error) 
      //리모트 서버로 에러 메세지를 보내구요,
      this.log(`${operation} failed: ${error.message}`);
      //여기서 사용자가 이해할 수 있는 메세지로 바꿔주고요.
      return of(result as T);
      //여기서 에러났다고 애플리케이션이 끊기면 안 되니까 인자로 받은 값을 다시 반환해서 애플리케이션을 구동시킵니다.

    }
  }
  //옵저버블 데이터를 확인하려면 Rxjs가 제공하는 tap method를 이용하는데, 이 연산자는 옵저법ㄹ 데이터를 이용해서 어떤 동작을 수행하는데, 옵저버블 데이터를 변경하지 않고 그대로 출력해줍니다. 그래서 사용자가 볼 수 있도록.

}

//1. HeroService가 히어로 데이터를 가져올 때 HTTP 요청을 통해 가져옵니다.
//2. 사용자가 추가/변경/삭제한 히어로 데이터는 HTTP 요청을 보내서 서버에 저장합니다.
//3. 사용자가 히어로의 이름으로 검색 가능하도록 합니다.





