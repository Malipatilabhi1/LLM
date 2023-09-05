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


  //for task based
  private isOpenSubject = new BehaviorSubject<boolean>(true);
  isOpen$ = this.isOpenSubject.asObservable();

  toggleSidenavForTaskBased() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  getShowSidenavForTaskBased(): boolean {
    return this.isOpenSubject.value;
  }


  // for rawdata clcik
  private showFoldersSubject = new BehaviorSubject<boolean>(true);
  private showDataListSubject = new BehaviorSubject<boolean>(false);

  showFolders$ = this.showFoldersSubject.asObservable();
  showDataList$ = this.showDataListSubject.asObservable();
  showDataList1$ = this.showDataListSubject.asObservable();

  toggleShowFolders(showFolders: boolean) {
    this.showFoldersSubject.next(showFolders);
  }

  toggleShowDataList(showDataList: boolean) {
    this.showDataListSubject.next(showDataList);
  }
  toggleShowDataList1(showDataList: boolean) {
    this.showDataListSubject.next(showDataList);
  }

}
