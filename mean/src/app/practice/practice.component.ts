import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';

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

  arr4 = [2, 5, 2, 3, 6, 7];

  arr5 = [1,2,4,5,7,8,10,13];

  displayedColumns: string[] = ['id', 'name', 'email', 'website'];
  dataSource:any;

  str1 = 'computer';
  str2 = 'car';
  result = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getTestPost().subscribe(res =>{
      console.log(res);
      let data:any = res;
      this.dataSource =new MatTableDataSource(data);
    })

    let data1 = this.str1.split('');
    let data2 = this.str2.split('');
    data2.map(item=>{
      console.log(item);
      [...data1].map((item1, ind)=>{
        if(item == item1){
          data1.splice(ind, 1);
        }
      })
    })
    console.log(data1.join().replace(/\,/g,' '));
  }

  findMissingAllNumber(arr){
    let minVal = Math.min(...arr);
    let maxVal = Math.max(...arr);
    let missing = [];

    for(let i = minVal; i<= maxVal; i++){
      if(!arr.includes(i)){
        missing.push(i);
      }
    }

    return missing;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

  removeDubSingle(){
    return [...new Set(this.arr4)];
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
    console.log(this.removeDubSingle());
    let joinArr = this.joinArr();
    console.log('Join Array Two Array', JSON.stringify(joinArr));
    let finArr = this.removeDuplicate();
    console.log('Remove duplicate on array', JSON.stringify(finArr));
    // this.arrayBasics();
    this.printSerise(5);
    console.log(this.findMissingAllNumber(this.arr5));
    
  }


  
}
