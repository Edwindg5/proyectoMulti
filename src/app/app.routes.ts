import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/components/home/home.component';

import { LoginComponent } from './pages/login/components/login/login.component';
import { RegisterComponent } from './pages/register/components/register/register.component';
import { CompraComponent } from './pages/compra/components/compra/compra.component';
import { VendeComponent } from './pages/vende/components/vende/vende.component';
import { RentaComponent } from './pages/renta/components/renta/renta.component';
import { IntercambiaComponent } from './pages/intercambia/components/intercambia/intercambia.component';
import { ElectronicaComponent } from './categories/component/electronica/electronica.component';
import { MaterialEstudioComponent } from './categories/component/material-estudio/material-estudio.component';
import { HerramientasComponent } from './categories/component/herramientas/herramientas.component';
import { AccesoriosComponent } from './categories/component/accesorios/accesorios.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './pages/users/components/users/users.component';
import { SolicitComponent } from './pages/solicit/solicit.component';
import { MysolicitsComponent } from './pages/mysolicits/mysolicits.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'compra', component: CompraComponent},// Solo accesible para admin
  { path: 'vende', component: VendeComponent},// Solo accesible para admin
  { path: 'renta', component: RentaComponent},// Solo accesible para admin
  { path: 'intercambia', component: IntercambiaComponent },
  { path: 'electronica', component: ElectronicaComponent },
  { path: 'material-estudio', component: MaterialEstudioComponent },
  { path: 'herramientas', component: HerramientasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'usuarios', component: UsersComponent}, // Solo accesible para admin
  { path: 'solicit', component: SolicitComponent },
  {path: 'mysolicit', component: MysolicitsComponent}
];
