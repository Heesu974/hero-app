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

//the hero property must be an Input property,
// hero-detail-component 입장에서는 데이터를 app component로부터 받아오기 때문에
// 아닌데?
//부모 컴포넌트인 HeroesComponent가 child compoenent인 HeroesDetailComponent라고 한다.
