import { Component } from '@angular/core';
import { PycalcService } from './services/pycalc.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  input:string = '';
  result:string = '';

  constructor(private service:PycalcService) {}
  
 
  pressNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") {
      if (this.input !="" ) {
        const lastNum=this.getLastOperand()
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '÷' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }
 
    this.input = this.input + num
    this.calcAnswer();
  }
 
 
  getLastOperand() {
    let pos:number;
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("÷") > pos) pos=this.input.lastIndexOf("÷")
    return this.input.substr(pos+1)
  }
 
 
  pressOperator(op: string) {
 
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '÷' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
   
    this.input = this.input + op
    this.calcAnswer();
  }
 
 
  clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
  }
 
  calcAnswer() {
    let formula = this.input;
    var response = ''
 
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '÷' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    this.service.calcFormula(formula).subscribe(response => {
      this.result  = response.result
    });
  }
 
  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }
}
