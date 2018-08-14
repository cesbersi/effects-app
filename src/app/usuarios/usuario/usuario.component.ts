import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CargarUsuario } from '../../store/actions';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  routeSubscription: Subscription = new Subscription();
  usuarioSubscription: Subscription = new Subscription();

  usuario: Usuario;
  loading: boolean;
  error: any;

  ngOnInit() {

    this.routeSubscription = this.router.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new CargarUsuario(id));
    });

    this.usuarioSubscription = this.store.select('usuario').subscribe(user => {
      this.usuario = user.user;
      this.loading = user.loading;
      this.error = user.error;

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
  }


}
