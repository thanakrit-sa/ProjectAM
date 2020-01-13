import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {

  filterData:any[] =[]
  // allPlayers: any[] = [
  //   {id: '123', name: 'joe blow'},
  //   {id: '234', name: 'carmen miranda'},
  //   {id: '345', name: 'andy airhead'},
  // ];
  // teamPlayers: string[] = [];
  // form: FormGroup;
  // constructor( fb:FormBuilder) { 
  //   let fbargs = {};
  //   this.allPlayers.forEach(it => fbargs[it.id] = []);
  //   this.form = fb.group(fbargs);
  //   this.teamPlayers.forEach(it => this.form.get(it).setValue(false));
  // }
  // makeTeam(): void {
  //   this.teamPlayers = [];
  //   console.log(this.teamPlayers);
  //   this.allPlayers.forEach((player) => {
  //     if (this.form.get(player.id).value) {
  //       this.teamPlayers.push(player.name);
  //     }
  //   });
  // }
  // onChange(a){
  //   console.log(a);
    
  // }

  constructor(){
    this.checkBoxList = [
      {
        id:"1",
        value:"Esteban Gutmann IV",
        isChecked:false
      },{
        id:"2",
        value:"Bernardo Prosacco Jr.",
        isChecked:false
      },{
        id:"3",
        value:"Nicholaus Kulas PhD",
        isChecked:false
      },{
        id:"4",
        value:"Jennie Feeney",
        isChecked:false
      },{
        id:"5",
        value:"Shanon Heaney",
        isChecked:false
      }
    ];
  }
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkBoxList:any;
ss:any =[]
  checkMaster() {
    setTimeout(()=>{
      this.checkBoxList.forEach(obj => {
        console.log(obj);
        
        obj.isChecked = this.masterCheck;

      });
    });
  }

  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map(obj => {console.log(obj);
    
      {}
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }
  num:any[]=[]
 
  sss(){
  this.num = this.checkBoxList.forEach(it => {
      (it.isChecked) == true
      console.log(this.num);
      
    });
 

  }
  filter(){
    this.filterData = this.checkBoxList.filter(it => it.isChecked == true)
    console.log(this.filterData);
    
  }

  ngOnInit() {
  }

}