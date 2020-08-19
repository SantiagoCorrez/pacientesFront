import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AplastarAlergiasService {

  constructor() { }
  
  isOpen = false;

  @Output() changeAler: EventEmitter<boolean> = new EventEmitter();

  toggleAler() {
    this.isOpen = !this.isOpen;
    this.changeAler.emit(this.isOpen);
  }
}
