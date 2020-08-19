import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './fsf/entrega1/login/login.component';
import { RegistroComponent } from './fsf/entrega1/registro/registro.component';
import { RecoveryComponent } from './fsf/entrega1/recovery/recovery.component';
import { RecoveryemailComponent } from './fsf/entrega1/recoveryemail/recoveryemail.component';
import { PortalComponent } from './fsf/entrega2/portal/portal.component';
import { HistorialComponent } from './fsf/entrega2/historial/historial.component'
import { CitasComponent } from './fsf/entrega2/citas/citas.component';
import { ExamenesComponent } from './fsf/entrega2/examenes/examenes.component'
import { ListadodocumentosComponent } from './fsf/entrega2/listadodocumentos/listadodocumentos.component';
import { PerfilComponent } from './fsf/entrega2/perfil/perfil.component';
import { PlanaltaComponent } from './fsf/entrega2/planalta/planalta.component';
import { PlanaltafromComponent } from './fsf/entrega2/planaltafrom/planaltafrom.component';
import { AyudaComponent } from './info/ayuda/ayuda.component';
import { PoliticasComponent } from './info/politicas/politicas.component';
import { HistorialpagosComponent } from './fsf/entrega2/historialpagos/historialpagos.component';
import { PagosComponent } from './fsf/entrega2/pagos/pagos.component';
import { IntegracioppComponent } from './fsf/entrega2/integraciopp/integraciopp.component';
import { ResultadoPagosComponent } from './fsf/entrega2/resultado-pagos/resultado-pagos.component';
import { FaqComponent } from './fsf/entrega2/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'loginapp/:redirect',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'recoverypassword/:pass/:resetdt/:resetd/:needOldPass',
    component: RecoveryComponent
  },
  {
    path: 'recovery',
    component: RecoveryemailComponent
  },
  {
    path: 'portalolder',
    component: PortalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'citas',
    component: CitasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'examenes',
    component: ExamenesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documentos',
    component: ListadodocumentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planalta/:idalta',
    component: PlanaltaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'historialpagos',
    component: HistorialpagosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resumenpay',
    component: IntegracioppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mispagos',
    component: PagosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'result/:idPago',
    component: ResultadoPagosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: AyudaComponent
  },
  {
    path: 'policies',
    component: PoliticasComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: '**',
    component: HistorialComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
