import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import * as UsuarioActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService

    ) { }


    @Effect()
    cargarUsuario$ = this.actions$.ofType(UsuarioActions.CARGAR_USUARIO)
        .pipe(
            switchMap((action: UsuarioActions.CargarUsuario) => {
                return this.usuarioService.getUserById(action.id)
                    .pipe(
                        map(user => {
                            return new UsuarioActions.CargarUsuarioSuccess(user);
                        }),
                        catchError(error => {
                            return of(new UsuarioActions.CargarUsuarioFail(error));
                        })
                    );
            })
        );

}
