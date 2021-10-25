import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-textile-yarn-units-converter',
  templateUrl: './textile-yarn-units-converter.component.html',
  styleUrls: ['./textile-yarn-units-converter.component.scss']
})
export class TextileYarnUnitsConverterComponent implements OnInit {
  title = 'Yarn titration converter';
  titrations: Titration[] = [
    new Titration(0,"Nm","km/kg"),
    new Titration(1,"Ne","840yd/lb"),
    new Titration(2,"Den","g/9Km"),
    new Titration(3,"Tex","g/km"),
    new Titration(4,"Dtex","g/10km"),
  ];


  constructor(){
    this.convert();
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
  }

  originalValue:string="1";
  selectedTitr:String=this.titrations[0].descr;
  id:number=0;

  convert():void{
    let value:number=0;
    if(this.originalValue != undefined){
      this.titrations.forEach(element => {
        if(element.descr==this.selectedTitr){
          this.id = element.id;
        }
      });
      value = this.getValue(value);
      
      this.titrations.forEach(element => {
        element.calculateValue(value,this.id);
      });
    }else{
      alert("Please insert a size value");
    }
  }
  private getValue(value: number) {
    if (this.id == this.titrations[0].id && this.originalValue.includes("/")) {
      value = this.getNmValue(value);
    } else if (this.id == this.titrations[1].id && this.originalValue.includes("/")) {
      value = this.getNeValue(value);
    } else if (this.id == this.titrations[4].id &&
      (this.originalValue.includes("/")
        || this.originalValue.toLocaleLowerCase().includes("*")
      )) {
      value = this.getDtexValue(value);
    } else {
      value = parseFloat(this.originalValue);
      if (this.isNumber(this.originalValue)) {
        value = parseFloat(this.originalValue);
      } else {
        value = null;
      }
    }
    if (value === null) {
      alert("Values can contains only numbers, '*' or '/'\n Special size values examples:\n Nm: 2/60000\n Ne: 60000/2\n Dtex: 2*120/4");
      value = 0;
    }
    return value;
  }

  private getDtexValue(value: number) {
    let tmp = this.originalValue.toLocaleLowerCase();
    tmp = tmp.replace("/", "").replace("*", "");
    if (this.isNumber(tmp)) {
      value = eval(this.originalValue);
    }else{
      value = null;
    }
    return value;
  }

  private getNeValue(value: number) {
    let spl: string[] = this.originalValue.split('/');
    if (this.isNumber(spl[0]) && this.isNumber(spl[1])) {
      let var1: number = parseFloat(spl[0]);
      let var2: number = parseFloat(spl[1]);
      value = var2 * var1;
    } else {
      value = null;
    }
    return value;
  }

  private getNmValue(value: number) {
    let spl: string[] = this.originalValue.split('/');
    if (this.isNumber(spl[0]) && this.isNumber(spl[1])) {
      let var1: number = parseFloat(spl[0]);
      let var2: number = parseFloat(spl[1]);
      value = var2 / var1;
    } else {
      value = null;
    }
    return value;
  }

  onChangeUnit(event: any):void{
    this.selectedTitr = event.target.value;
  }

  isNumber(str:string):boolean{
    return /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(str);
  }

  
}
class Titration {
  id!: number;
  descr!: String;
  value!:number;
  units!:String;

  constructor(id:number,descr:String,units:String){
    this.id=id;
    this.descr = descr;
    this.value = 0;
    this.units = units;
  }

  functions:any[][]=[
    [this.nmToNm,this.nmToNe,this.nmToDen,this.nmToTex,this.nmToDTex,],
    [this.neToNm,this.neToNe,this.neToDen,this.neToTex,this.neToDTex,],
    [this.denToNm,this.denToNe,this.denToDen,this.denToTex,this.denToDTex,],
    [this.texToNm,this.texToNe,this.texToDen,this.texToTex,this.texToDTex,],
    [this.dtexToNm,this.dtexToNe,this.dtexToDen,this.dtexToTex,this.dtexToDTex,],
  ];

  calculateValue(originalValue:number,selectedTitration:number):void{
    if(originalValue!= 0){
      this.value = this.functions[selectedTitration][this.id](originalValue);
    }else{
      this.value = 0;
    }
  }

  // TEX
  texToDTex(originalValue:number):number{
    return originalValue *10;
  }
  texToDen(originalValue:number):number{
    return originalValue *9;
  }

  texToNm(originalValue:number):number{
    return 1000/originalValue;
  }
  texToNe(originalValue:number):number{
    return 590.5/originalValue;
  }
  texToTex(originalValue:number):number{
    return originalValue;
  }

  // DTEX
  dtexToDTex(originalValue:number):number{
    return originalValue;
  }
  dtexToDen(originalValue:number):number{
    return originalValue *0.9;
  }

  dtexToNm(originalValue:number):number{
    return 10000/originalValue;
  }
  dtexToNe(originalValue:number):number{
    return 5905.4/originalValue;
  }
  dtexToTex(originalValue:number):number{
    return originalValue/10;
  }

  // NM
  nmToDTex(originalValue:number):number{
    return 10000/originalValue;
  }
  nmToDen(originalValue:number):number{
    return 9000/originalValue;
  }

  nmToNm(originalValue:number):number{
    return originalValue;
  }
  nmToNe(originalValue:number):number{
    return originalValue*1.6934;
  }
  nmToTex(originalValue:number):number{
    return 1000/originalValue;
  }

  // NE
  neToDTex(originalValue:number):number{
    return 5905.4/originalValue;
  }
  neToDen(originalValue:number):number{
    return 5314.9/originalValue;
  }
  neToNm(originalValue:number):number{
    return originalValue*1.6934;
  }
  neToNe(originalValue:number):number{
    return originalValue;
  }
  neToTex(originalValue:number):number{
    return 590.5/originalValue;
  }

  // DEN
  denToDTex(originalValue:number):number{
    return originalValue/0.9;
  }
  denToDen(originalValue:number):number{
    return originalValue;
  }
  denToNm(originalValue:number):number{
    return 	9000/originalValue;
  }
  denToNe(originalValue:number):number{
    return 	5314.9/originalValue;
  }
  denToTex(originalValue:number):number{
    return originalValue/9;
  }
};
