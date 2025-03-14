import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss'
})
export class FactsComponent implements OnInit {
//this is a variable that hold number 
clientCount: number = 0;
//same proccess for all 
projectCount:  number = 0;
supportCount:  number = 0;
customerSattisfactionCount:  number = 0;

//we have creat setInterval function with arrow function
//and set them in a variable that is clientCountStop.
clientCountStop: any = setInterval(()=>{
  this.clientCount++
//we need to stop this particular point; will use if condition
  if (this.clientCount == 287) {
    //clearInterval will stop that function 
    clearInterval(this.clientCountStop);
  }
}, 5) //5 is ms time and you can control it 


projectCountStop: any = setInterval(()=>{
  this.projectCount++
  if (this.projectCount == 42) {
    clearInterval(this.projectCountStop);
  }
}, 10)

supportCountStop: any = setInterval(()=>{
  this.supportCount++
  if (this.supportCount == 432) {
    clearInterval(this.supportCountStop);
  }
}, 2)

customerSattisfactionCountStop: any = setInterval(()=>{
  this.customerSattisfactionCount++
  if (this.customerSattisfactionCount == 98) {
    clearInterval(this.customerSattisfactionCountStop);
  }
}, 5)


constructor() { }

ngOnInit(): void {
}

}
