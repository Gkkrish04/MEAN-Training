import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {
  arr1 = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
    { id: 4, name: 'name4' },
  ];

  arr2 = [
    { id: 5, name: 'name5' },
    { id: 2, name: 'name2' },
    { id: 6, name: 'name6' },
    { id: 7, name: 'name7' },
    { id: 5, name: 'name5' },
  ];

  arr3 = ['money', 'currency', 'doller', 'Rupee', 'yen'];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  arrayBasics() {
    console.log(this.arr3.join(' '));
    console.log(this.arr3.pop());
    console.log(this.arr3.shift());
    console.log(this.arr3.splice(0, 1));
    console.log(this.arr3.slice(1));
    console.log(this.arr3.reverse());
  }

  joinArr() {
    let joinArrVal = this.arr1.concat(this.arr2);
    return joinArrVal;
  }

  arrFilter() {
    const filterArr = this.arr1.filter((el) => {
      return el.id == 3;
    });
    return filterArr;
  }

  removeDuplicate() {
    let joinArrVal = this.arr1.concat(this.arr2);
    let finArr = joinArrVal.filter((obj, index, self) => {
      return index === self.findIndex((t) => t.id === obj.id);
    });
    return finArr;
  }

  printSerise(len){
    let val = len;
    for(let i = 1; i <= val; i++){
      console.log(Array(i).fill('*').join(' '));
    }
  }

  check() {
    let value = this.arrFilter();
    console.log('Array Filter', JSON.stringify(value));
    let joinArr = this.joinArr();
    console.log('Join Array Two Array', JSON.stringify(joinArr));
    let finArr = this.removeDuplicate();
    console.log('Remove duplicate on array', JSON.stringify(finArr));
    // this.arrayBasics();
    this.printSerise(5);
  }
}
