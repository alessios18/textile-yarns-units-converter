import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  originalValue:number=1;
  selectedTitr:String=this.titrations[0].descr;
  id:number=0;

  convert():void{
    if(this.originalValue != undefined){
      
      this.titrations.forEach(element => {
        if(element.descr==this.selectedTitr){
          this.id = element.id;
        }
      });
      this.titrations.forEach(element => {
        element.calculateValue(this.originalValue,this.id);
      });
    }else{
      alert("inserisci un valore");
    }
  }
  onChangeUnit(event: MatSelectChange):void{
    this.selectedTitr = event.value;
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
    this.value = this.functions[selectedTitration][this.id](originalValue);
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
