import { BulkprovisionService } from './services/bulkprovision.service';

import { DataService } from './services/data.service';
import { ServiceinventoryService } from './services/serviceinventory.service';
import { InfraprovisionService } from './services/infraprovision.service';
import { SubscriberprovisionService } from './services/subscriberprovision.service';
import {TopologyService} from './services/topology.service';

import { OltprovisionService } from './services/oltprovision.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule,Http, BaseRequestOptions } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './common/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { AuthService } from './services/auth.service';
import { InfraprovisionComponent } from './infraprovision/infraprovision.component';
import { OltprovisionComponent } from './oltprovision/oltprovision.component';
import { SubscriberprovisionComponent } from './subscriberprovision/subscriberprovision.component';
import { ServiceinventoryComponent } from './serviceinventory/serviceinventory.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { TopologyComponent } from './topology/topology.component';
import { BulkprovisionComponent } from './bulkprovision/bulkprovision.component';
import { TopologyRedirectionComponent } from './topology_redirection/topology_redirection.component';



export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InfraprovisionComponent,
    OltprovisionComponent,
    SubscriberprovisionComponent,
    ServiceinventoryComponent,
    MainscreenComponent,
    TopologyComponent,
    BulkprovisionComponent,
    TopologyRedirectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,
    ReactiveFormsModule,    
    RouterModule.forRoot([
      { path: '',component: LoginComponent },
      { path: 'login',component: LoginComponent },
      { path: 'mainscreen',component: MainscreenComponent, canActivate: [AuthGuard]},
      { path: 'topology',component: TopologyComponent, canActivate: [AuthGuard]},
      { path: 'topology_redirection',component: TopologyRedirectionComponent, canActivate: [AuthGuard]},
      { path: 'home',component: HomeComponent, canActivate: [AuthGuard]} ,
      { path: 'home/:serviceid',component: HomeComponent, canActivate: [AuthGuard]} ,
      { path: 'infraprovision',component: InfraprovisionComponent, canActivate: [AuthGuard]} ,
      { path: 'oltpro',component: OltprovisionComponent, canActivate: [AuthGuard]} ,      
      { path: 'oltpro/:serviceid',component: OltprovisionComponent, canActivate: [AuthGuard]} ,
      { path: 'subscriberpro',component: SubscriberprovisionComponent, canActivate: [AuthGuard]} ,
      { path: 'subscriberpro/:serviceid',component: SubscriberprovisionComponent, canActivate: [AuthGuard]} ,
      { path: 'services',component: ServiceinventoryComponent, canActivate: [AuthGuard]} ,
      { path: 'bulk',component: BulkprovisionComponent, canActivate: [AuthGuard]} ,
      { path: '**',component: LoginComponent }
    ])
  ],
  providers: [
    AuthService,
    DataService,
    AuthGuard,
    AuthHttp,
    InfraprovisionService,
	  TopologyService,
    SubscriberprovisionService,
    ServiceinventoryService,
    OltprovisionService,
    BulkprovisionService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
