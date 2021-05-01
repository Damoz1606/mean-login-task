import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private idSource = new BehaviorSubject('ID');
  currentID = this.idSource.asObservable();

  constructor(private cookies: CookieService) {
    this.changeID(this.cookies.get('user'));
  }

  changeID(id: string){
    this.cookies.set('user', id, {expires: 1});
    this.idSource.next(id);
  }
}
