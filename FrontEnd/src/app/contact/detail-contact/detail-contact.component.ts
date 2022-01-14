import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactApiService } from 'src/app/contact-api.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.css']
})
export class DetailContactComponent implements OnInit {

  constructor(private service:ContactApiService) { }

  @Input() contact:any;
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  phone: string = "";

  ngOnInit(): void {
    this.id = this.contact.id;
    this.firstName = this.contact.firstName;
    this.lastName = this.contact.lastName;
    this.address = this.contact.address;
    this.phone = this.contact.phone;
  }

  closeDetails() {
    var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
  }
}
