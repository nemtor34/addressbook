import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactApiService } from 'src/app/contact-api.service';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent implements OnInit {

  contactList$!:Observable<any[]>;

  constructor(private service:ContactApiService) { }

  ngOnInit(): void {
    this.contactList$ = this.service.getContactList("",1,1);
  }

  // Variables (properties)
  modalTitle:string = '';
  activateAddEditContactComponent:boolean = false;
  activateDetailContactComponent:boolean = false;
  contact:any;
  keyword:string = '';
  option:number = 1;
  page:number = 1;
  hasPrevious:boolean = true;
  hasNext:boolean = true;

  modalDetails(item:any) {
    this.contact = item;
    this.modalTitle = "Contact Details"
    this.activateDetailContactComponent = true;
  }

  closeDetails(){
    this.activateDetailContactComponent = false;
  }

  previousPage() {
    this.page = this.page - 1;
    this.contactList$ = this.service.getContactList(this.keyword,this.option,this.page);
  }

  nextPage() {
    this.page = this.page + 1;
    this.contactList$ = this.service.getContactList(this.keyword,this.option,this.page);
  }

  search() {
    this.contactList$ = this.service.getContactList(this.keyword,this.option,1);
  }

  modalAdd() {
    this.contact = {
      id:0,
      firstName:null,
      lastName:null,
      address:null,
      phone:null
    }
    this.modalTitle = "Add Contact";
    this.activateAddEditContactComponent = true;
  }

  modalEdit(item:any) {
    this.contact = item;
    this.modalTitle = "Edit Contact";
    this.activateAddEditContactComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete contact ${item.id}`)) {
      this.service.deleteContact(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.contactList$ = this.service.getContactList("",1,1);
      })
    }
  }

  modalClose() {
    this.activateAddEditContactComponent = false;
    this.contactList$ = this.service.getContactList("",1,1);
  }

}
