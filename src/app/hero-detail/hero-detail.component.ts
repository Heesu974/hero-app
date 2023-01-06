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
  ngOnInit():void {
    this.getHero()
  }

  getHero():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goback():void {
    this.location.back();
  }
  save(): void{
    if(this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goback());
    }
  }
  
//여기서 location은 class 입니다.
  
}

