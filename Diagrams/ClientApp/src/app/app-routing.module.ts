import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HomeComponent } from './home/home.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'radar-chart', component: RadarChartComponent },
  { path: 'doughnut-chart', component: DoughnutChartComponent },
  { path: 'polar-area-chart', component: PolarAreaChartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
