import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperacoesComponent } from './operacoes/operacoes.component';
import { LoginComponent } from './login/login.component';

/**
 * Rotas
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Rota primária, redirecciona para o login
  { path: 'login', component: LoginComponent },
  { path: 'operacoes', component: OperacoesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
