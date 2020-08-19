import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AplastarpatService {

  constructor() { }

  isOpen = false;

  @Output() changePt: EventEmitter<boolean> = new EventEmitter();

  togglepat() {
    this.isOpen = !this.isOpen;
    this.changePt.emit(this.isOpen);
  }
}
