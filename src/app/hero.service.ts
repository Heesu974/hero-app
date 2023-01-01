import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  getHeroes(): Hero[] {
    return HEROES;
  }
}

//@Injectable() 데코레이터는 service를 위한 metadata object를 갖는다. 이는 component 클래스의 @Component() 데코레이터와 같다.

//HeroService는 hero data를 어디에서든 가져 올 수 있다. web service ok, local storage ok, mock data source ok,
//여기서는 직접 제작한 HROES 즉, mock data를 이용한다.

//getHeroes() method를 통해 mock 데이타를 반환한다.

//기본적으로 ng generate service는 provider를 root injector에 등록한다. provider 메타데이터를 포함함으로써. 이게 providedIn: 'root'가 되는거.


