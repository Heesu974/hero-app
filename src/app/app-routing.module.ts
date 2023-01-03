import { NgModule } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';


const routes: Routes = [{
  path: 'heroes',
  component:HeroesComponent,
}];

//위의 코드 때문에, app-routing.module.ts가 이미 HeroesComponent에 import되었다. 
//routes array에서 app-routing-module을 HeroesComponent에 사용할 수 있게 된다.

//app-routing-0mcoudle이 commonModule이기 때문에 참조를 하거나, declaration  array에 선언하는 것은 불필요하다. 
//그렇기 때문에 AppRoutingModule

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//First, the app-routing-module.ts file은 RouterModule과 Routes에 import 한다. 
//따라서 application은 routing 능력을 갖게 된다.
// 다음 import는 HeroesComponent로, Router가 어딘가로 가기 위함? 사용자가 routes를 설정했을 한번, 
// Heroescomponent는 Router를 어딘가로 보내기 위함 사용자가 라우트를 설정했을 때ㅡ

// 다음 해야할 일은 내가 어디에 내 route를 설정할 것인지 결정하는 것.

//@ngModule의 imports 배열의 RouterModule.forRoot(routes)는 RouterModule을 AppRoutingModule에 
//이 method는 forRoot()를 call하는데, 이는 내가 router를 application의 root level에서 설정했기 때문이다. 
//forRoot() method 는  라우팅에 필요한 service provider와 directives을 제공한다.
//처음의 navigation과 current brower url을 기반으로 하는 처음의 navigation을 실행합니다.

//그 다음으로 app-routing module이 하는 일이 routermodule을 export시켜서 application을 통틀어 사용가능하도록 실행한다.



