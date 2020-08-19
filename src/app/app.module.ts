import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserIdleModule } from 'angular-user-idle';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

/*Service*/
import { LoginService } from './service/entrega1/login.service';
import { RegistroService } from './service/entrega1/registro.service';
import { RecoverypasswordService } from './service/entrega1/recoverypassword.service';
import { RecoveryService } from './service/entrega1/recovery.service';
import { ProceterapService } from './service/entrega2/proceterap.service';
import { ResultexamenService } from './service/entrega2/resultexamen.service';
import { DatospacienteService } from './service/entrega2/datospaciente.service';
import { HistorialAnamnesisService } from './service/entrega2/historial-anamnesis.service';
import { SolicitudcitasService } from './service/entrega2/solicitudcitas.service';
import { AlergiasService } from './service/entrega2/alergias.service';
import { ListaPagosService } from './service/entrega2/pagos/lista-pagos.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './fsf/entrega1/login/login.component';
import { RegistroComponent } from './fsf/entrega1/registro/registro.component';
import { RecoveryComponent } from './fsf/entrega1/recovery/recovery.component';
import { RecoveryemailComponent } from './fsf/entrega1/recoveryemail/recoveryemail.component';
import { PortalComponent } from './fsf/entrega2/portal/portal.component';
import { SolicitudcitasComponent } from './fsf/entrega2/solicitudcitas/solicitudcitas.component';
import { NoticiasComponent } from './fsf/entrega2/noticias/noticias.component';
import { ProcedimientosComponent } from './fsf/entrega2/procedimientos/procedimientos.component';
import { ResultadosexamenesComponent } from './fsf/entrega2/resultadosexamenes/resultadosexamenes.component';
import { HistoriaclinicaComponent } from './fsf/entrega2/historiaclinica/historiaclinica.component';
import { MedicamentosComponent } from './fsf/entrega2/medicamentos/medicamentos.component';
import { HistorialComponent } from './fsf/entrega2/historial/historial.component';
import { CitasComponent } from './fsf/entrega2/citas/citas.component';
import { ExamenesComponent } from './fsf/entrega2/examenes/examenes.component';
import { HistorialAnamnesisComponent } from './fsf/entrega2/historial-anamnesis/historial-anamnesis.component';
import { ListadodocumentosComponent } from './fsf/entrega2/listadodocumentos/listadodocumentos.component';
import { PerfilComponent } from './fsf/entrega2/perfil/perfil.component';
import { AlergiasComponent } from './fsf/entrega2/alergias/alergias.component';
import { PlanaltaComponent } from './fsf/entrega2/planalta/planalta.component';
import { PlanaltafromComponent } from './fsf/entrega2/planaltafrom/planaltafrom.component';
import { AyudaComponent } from './info/ayuda/ayuda.component';
import { PoliticasComponent } from './info/politicas/politicas.component';
import { PreradicacionComponent } from './fsf/entrega2/preradicacion/preradicacion.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ChangePassComponent } from './fsf/entrega2/changepass/changepass.component';
import { InterceptorService } from './service/auth/interceptor';
import { PreRecepcionComponent } from './fsf/entrega2/pre-recepcion/pre-recepcion.component';
import { MaterialModule } from './meterial';
import { PaymessagesComponent } from './fsf/entrega2/messages/paymessages/paymessages.component';
import { HistorialpagosComponent } from './fsf/entrega2/historialpagos/historialpagos.component';
import { MihistorialpagosComponent } from './fsf/entrega2/mihistorialpagos/mihistorialpagos.component';
import { PagosComponent } from './fsf/entrega2/pagos/pagos.component';
import { MispagosComponent } from './fsf/entrega2/mispagos/mispagos.component';
import { IntegracioppComponent } from './fsf/entrega2/integraciopp/integraciopp.component';
import { PlacetopayComponent } from './fsf/entrega2/placetopay/placetopay.component';
import { NavbarComponent } from './fsf/entrega1/navbar/navbar.component';
import { ResultadoPagosComponent } from './fsf/entrega2/resultado-pagos/resultado-pagos.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { FaqComponent } from './fsf/entrega2/faq/faq.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecoveryComponent,
    RecoveryemailComponent,
    PortalComponent,
    SolicitudcitasComponent,
    NoticiasComponent,
    ProcedimientosComponent,
    ResultadosexamenesComponent,
    HistoriaclinicaComponent,
    MedicamentosComponent,
    HistorialComponent,
    CitasComponent,
    ExamenesComponent,
    HistorialAnamnesisComponent,
    ListadodocumentosComponent,
    PerfilComponent,
    AlergiasComponent,
    PlanaltaComponent,
    PlanaltafromComponent,
    AyudaComponent,
    PoliticasComponent,
    PreradicacionComponent,
    ChangePassComponent,
    PreRecepcionComponent,
    PaymessagesComponent,
    HistorialpagosComponent,
    MihistorialpagosComponent,
    PagosComponent,
    MispagosComponent,
    IntegracioppComponent,
    PlacetopayComponent,
    NavbarComponent,
    ResultadoPagosComponent,
    TranslatePipe,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MomentModule,
    MaterialModule,
    DeviceDetectorModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    RecaptchaModule.forRoot(),
    NgxMyDatePickerModule.forRoot()
  ],
  entryComponents: [
    PreRecepcionComponent,
    PaymessagesComponent
  ],
  providers: [
    LoginService,
    RegistroService,
    RecoverypasswordService,
    RecoveryService,
    CookieService,
    ProceterapService,
    ResultexamenService,
    HistorialAnamnesisService,
    SolicitudcitasService,
    ListaPagosService,
    AlergiasService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
