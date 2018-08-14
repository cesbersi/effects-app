import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as fromUsuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  subscription: Subscription = new Subscription();
  loading: boolean;
  error: any;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.dispatch(new fromUsuariosActions.CargarUsuarios());

    this.subscription = this.store.select('usuarios').subscribe(users => {
      this.usuarios = users.users;
      this.loading = users.loading;
      this.error = users.error;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
