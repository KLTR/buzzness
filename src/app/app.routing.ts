import { FacebookComponent } from './Components/facebook/facebook.component';
import { InstagramComponent } from './Components/instagram/instagram.component';
import { YoutubeComponent } from './Components/youtube/youtube.component';
import { HomeComponent } from './Components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
  },
    {
        path: 'instagram',
        component: InstagramComponent
    },
    {
        path: 'youtube',
        component: YoutubeComponent
    },
    {
        path: 'facebook',
        component: FacebookComponent
    },
  //   {
  //     path: 'payment',
  //     component: PaymentComponent
  // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
