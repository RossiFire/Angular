import { Component, OnInit, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { BtnStyle } from '../ButtonStyle';
@Component({
  selector: 'primo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  @Input() buttonConfig : ButtonConfig;  


  myStyle(): object {
    return { 'background-color' : this.buttonConfig.customCss[0].value,
      'color' : this.buttonConfig.customCss[1].value ,
      'border-color' : this.buttonConfig.customCss[2].value
    };
  } 

}

export class ButtonConfig{
  customCss : BtnStyle[]
  icon : string;
  text : string;
}
