import { Component, OnInit, HostListener } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';
import { Order } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Blob } from 'blob';
import { APIService } from '../API.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.page.html',
  styleUrls: ['./order-form.page.scss'],
})


export class OrderFormPage implements OnInit {
  roomnumber: string = "";
  email: string = "";
  date: string = "";
  time: string = "";
  deliverytime: string = "";
  currentdorm: string = "";
  currentOrder: any;
  data: String;
  apiURL: string = 'https://localhost:5000/aws/uploadFile';
  jsonBlob: any;
  todos: Array<any>;
  submitted: boolean;
  browser: any;
  mobileView: boolean;
  desktopView: boolean;
  public orderForm: FormGroup;



  constructor(platform: Platform, public storage: Storage, private http: HttpClient, private file: File, private apiService: APIService, public formBuilder: FormBuilder) { 
    this.currentdorm = '';
    platform.ready().then(() => {
      if(platform.width() <= 900){
        this.mobileView = true;
        this.desktopView = false;
      }
      else {
        this.desktopView = true;
        this.mobileView = false;
      }
    });

    this.orderForm = formBuilder.group({
      roomnumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      dorm: new FormControl('', [Validators.required]),
      deliverytime: new FormControl(''),
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth <= 900){
      this.mobileView = true;
      this.desktopView = false;
    }
    else {
      this.desktopView = true;
      this.mobileView = false;
    }
  }
  ngOnInit() {
    this.submitted = false;
  }
  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  currentdate: String = new Date().toISOString();
  dorms = [{ "name" : "Northside", "src": "../../assets/photos/dorms/York-College-Northside.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Penn", "src": "../../assets/photos/dorms/York-College-Pennhall.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Country Club", "src": "../../assets/photos/dorms/York-College-CountryClub.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Brockie", "src": "../../assets/photos/dorms/York-College-Brockie.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Spring Garden", "src": "../../assets/photos/dorms/York-College-SpringGarden.jpg", "doorsidedelivery":"true", "maketransparent": "null"}, 
  { "name" : "Susquehanna", "src": "../../assets/photos/dorms/York-College-Susquehanna.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Tyler Run", "src": "../../assets/photos/dorms/York-College-TylerRun.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Little Run", "src": "../../assets/photos/dorms/York-College-Littlerun.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Manor", "src": "../../assets/photos/dorms/York-College-ManorNorthHall.jpg", "doorsidedelivery":"true", "maketransparent": "null"},

];
  public getColor(doorsidedelivery: string): string{
    return doorsidedelivery == "true" ? "green" : "red";
  }
  styleObject(transparent): Object {
    if (transparent == "null") {
      return {}
    }
    if (transparent != "false"){
        return {opacity: 0.3,filter: 'alpha(opacity=50)'};
    }
    return {}
  }

  



  public goToDetails(dorm) {
    this.orderForm.patchValue({dorm: dorm.name});
      for(let key in this.dorms){
        if (dorm.name === this.dorms[key].name) {
          console.log('this one matches ' + dorm.name)
          this.dorms[key].maketransparent = "false";
          console.log(this.orderForm);
          console.log(this.dorms[key]);
        }
        else 
          this.dorms[key].maketransparent = "true";
      }
    }

    public currentSelectedDorm(): string {
      for(let key in this.dorms) {
        if(this.dorms[key].maketransparent === "false") {
          this.orderForm.patchValue({dorm: this.dorms[key].name})
          this.currentdorm = this.dorms[key].name;
          return this.currentdorm;
        }
        return '';
      }
    }
  

    public onSubmit() {
      this.currentSelectedDorm();
      const {roomnumber, email, dorm, deliverytime} = this.orderForm.value;
      this.currentOrder= new Order();
      this.currentOrder.dorm = dorm;
      this.currentOrder.date = this.currentdate;
      this.currentOrder.time = deliverytime;
      this.currentOrder.email = email;
      this.currentOrder.roomnumber = roomnumber;
      this.currentOrder.venmodescription = String(dorm+' '+ roomnumber+ ' '+ uuid());
      this.storage.set("orderStored", JSON.stringify(this.currentOrder));
      this.submitted = true;
      this.createOrder(this.currentOrder);
    }

    get(){
      this.storage.get('orderStored').then(status=>{
        var orderInfo = JSON.parse(status);
        alert("info is-->"+orderInfo.venmodescription)
      });
    }
  public createOrder(order){
    let email = String(order.email);
    let dorm = String(order.dorm);
    let roomnumber = String(order.roomnumber);
    let date = String(order.date);
    let time = String(order.time);
    let venmodescription= String(order.venmodescription);
    this.apiService.CreateOrder({
      id: uuid(),
      email: email,
      dorm: dorm,
      roomNumber: roomnumber,
      date: date,
      time : time,
      venmoDescription: venmodescription
    })
    console.log(order.email, order.dorm, order.roomnumber, order.date, order.time, order.venmodescription + ' has been submitted to the server!');
  }

}
