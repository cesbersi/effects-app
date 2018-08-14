import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import * as UsuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';


@Injectable()
export class UsuariosEffects {


    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService

    ) { }


    @Effect()
    cargarUsuarios$ = this.actions$.ofType(UsuariosActions.CARGAR_USUARIOS)
        .pipe(
            switchMap(() => {
                return this.usuarioService.getUsers()
                    .pipe(
                        map(users => {
                            return new UsuariosActions.CargarUsuariosSuccess(users);
                        }),
                        catchError(error => {
                            return of(new UsuariosActions.CargarUsuariosFail(error));
                        })
                    );
            })
        );

}
