import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from "./components/main-content/main-content.component";

const routes: Routes = [
    {
      path: 'content/we-retail-journal/angular/blog.html',
      component: MainContentComponent,
      data: {
        path: '/content/we-retail-journal/angular/blog'
      }
    },
    {
      path: 'content/we-retail-journal/angular/blog/aboutus.html',
      component: MainContentComponent,
      data: {
        path: '/content/we-retail-journal/angular/blog/aboutus'
      }
    },
    {
      path: 'content/we-retail-journal/angular/blog/weather.html',
      component: MainContentComponent,
      data: {
        path: '/content/we-retail-journal/angular/blog/weather'
      }
    },
    {
      path: 'content/we-retail-journal/angular/home.html',
      component: MainContentComponent,
      data: {
        path: '/content/we-retail-journal/angular/home'
      }
    },
    {
      path: 'content/we-retail-journal/angular.html',
      redirectTo: 'content/we-retail-journal/angular/home.html'
    },
    {
      path: '',
      redirectTo: 'content/we-retail-journal/angular.html',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes
    )],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
