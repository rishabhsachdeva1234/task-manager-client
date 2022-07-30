import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertHandlerService {
  private _$alert: Subject<any> = new Subject();
  constructor() {}

  sendAlert(message: string, error: boolean = false): void {
    this._$alert.next({ message, error });
  }

  getAlert() {
    return this._$alert.asObservable();
  }
}
