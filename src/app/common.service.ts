import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  uploadedData: any[] = [];
  models:any=[];
  model:any=[];

  modelData(model:any){
    this.model=model;
  }
  uploadedFile(){
    
  }

  private showSidenav = false;

  setShowSidenav(value: boolean): void {
    this.showSidenav = value;
  }

  getShowSidenav(): boolean {
    return this.showSidenav;
  }

  private toggleSidenavSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  

  toggleSidenav() {
    this.toggleSidenavSubject.next(true);
  }

  getToggleSidenavObservable(): Observable<boolean> {
    return this.toggleSidenavSubject.asObservable();
  }
}
