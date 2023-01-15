import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperacoesComponent } from '../operacoes/operacoes.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'operacoes', component: OperacoesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }