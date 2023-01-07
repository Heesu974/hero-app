import { Component } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent {
  //herroes$ 프로퍼티는 Observable 타입으로 선언합니다.
  heroes$!: Observable<Hero[]>;
  //이 옵저버블 구독은 ngOnInit() 에서 시작합니다. 지금은 searchTerms를 선언하는 방법에 대해 먼저 알아봅니다. 
 private searchTerms = new Subject<string>();
  //searchTerms 프로퍼티를 rxjs가 제공하는 Subject 객체로 선언.
  search(term: string):void {
    this.searchTerms.next(term);
  }
  //사용자가 입력한 검색어를 옵저버블 스트림으로 보낸다.

  //Observable로 값을 보내기 위해서 next(value) 메소드를 실행.
  constructor(private heroservice:HeroService){}
ngOnInit():void{
  this.heroes$ = this.searchTerms.pipe(
    //연속된 키입력을 처리하기 위해 300mns 동안 대기
    debounceTime(300),
    
    //이전에 입력한 검색어와 같으면 무시 > 사용자가  입력한 문자열의 내용이 변경되었을 때만 옵저버블 스트림을 전달
    distinctUntilChanged(),

    //검색어가 변경되면 새로운 옵저버블을 생성한다.
    switchMap((term:string) => this.heroservice.searchHeroes(term))

  )
}
 
 

}
