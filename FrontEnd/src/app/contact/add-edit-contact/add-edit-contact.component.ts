import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactApiService } from 'src/app/contact-api.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  contactList$!: Observable<any[]>;

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
    this.contactList$ = this.service.getContactList("",1,1);
  }

  addContact() {
    var contact = {
      firstName:this.firstName,
      lastName:this.lastName,
      address:this.address,
      phone:this.phone
    }
    this.service.addContact(contact).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateContact() {
    var contact = {
      id: this.id,
      firstName:this.firstName,
      lastName:this.lastName,
      address:this.address,
      phone:this.phone
    }
    var id:number = this.id;
    this.service.updateContact(id,contact).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}
