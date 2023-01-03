import { BindingPipe } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Hero } from '../hero';

import { ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    ) {

  }

  

  //ActivatedRoute holds information about route

  //activatedroute는 route information을 가지고 있는데, 이 route information은 herodetailcomponent의 instance에 관한 information이다.

  //HeroService는 hero data를 remote server로 부터 가져오고, 이 component가 이걸 herotodisplay를 위해 사용합니다.

  //location은 angular service이고, 브라우저와 상호작용합니다. 이 서비스가 이전 페이지로 갈 수 있도록 도와줍니다.
}

