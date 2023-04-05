import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  arr1 = [
    {id:1, name:'name1'},
    {id:2, name:'name2'},
    {id:3, name:'name3'},
    {id:4, name:'name4'},
  ];

  arr2 = [
    {id:5, name:'name5'},
    {id:2, name:'name2'},
    {id:6, name:'name6'},
    {id:7, name:'name7'},
    {id:5, name:'name5'},
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  arrFilter(){
    const filterArr =
    this.arr1.filter( el=>{
      console.log(el);
      return el.id == 3;
    })
    return filterArr;
  }

  joinArr(){
    let joinArrVal = this.arr1.concat(this.arr2);
    return joinArrVal;
  }

  removeDuplicate(){
    let joinArrVal = this.arr1.concat(this.arr2);
    let finArr = joinArrVal.filter((obj, index, self)=> {
      return index === self.findIndex((t)=> (t.id === obj.id));
    });
    return finArr;
  }

  check(){
   let value = this.arrFilter();
   console.log(JSON.stringify(value));
   let joinArr = this.joinArr();
   console.log(JSON.stringify(joinArr));
   let finArr = this.removeDuplicate();
   console.log( JSON.stringify(finArr));
  }

}
