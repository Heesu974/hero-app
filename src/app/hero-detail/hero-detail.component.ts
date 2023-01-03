import { BindingPipe } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
}

//component는 service에 접근해서 데이터를 present 해야만 한다.

//여기서는 HeroService를 만들거고,
//이건 모든 application 클래스가 heroes를 얻을 수 있다.

//Service는 서로 연결되어 있지 않는 클래스 간에 대이터를 공유하기에 아주 좋은 방법.

//MessageService를 생성하고, 두 곳에 이를 inject합니다.
//1. 먼저, HeroServie에 inject합니다.
//HeroService는 MessageService를 메세지를 보낼 때 사용할 것입니다.
//2. MessageComponent에 inject합니다.
//MessageComponent가 해당 메세지를 출력할 수 있고, 또한 유저가 클릭한 hero 아이디를 보여줄 수 있도록 하기 위함

//HeroDetailComponent는 selected hero의 디테일을 보연준다.
//이 순간은  HeroDetailComponent가 HeroesComponent의 아래에 오직 나타나는 순간에.