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
import { TodosLosProductosComponent } from './categories/component/todos-los-productos/todos-los-productos.component';
import { ComponentesElectronicosComponent } from './categories/component/componentes-electronicos/componentes-electronicos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'vende', component: VendeComponent },
  { path: 'renta', component: RentaComponent },
  { path: 'intercambia', component: IntercambiaComponent },
  {path: 'electronica', component: ElectronicaComponent},
  {path: 'material-estudio', component:MaterialEstudioComponent },
  {path: 'herramientas', component:HerramientasComponent},
  {path:'accesorios', component:AccesoriosComponent},
  {path: 'componentes-electronicos', component:ComponentesElectronicosComponent},
  {path:'todos-los-productos', component:TodosLosProductosComponent}
];
