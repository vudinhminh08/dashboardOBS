import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate, CanDeactivateFn } from '@angular/router';


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


@Injectable()
export class CanDeactiveGuard implements CanDeactivate<CanComponentDeactivate>{
  canDeactivate(component: CanComponentDeactivate){
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}



