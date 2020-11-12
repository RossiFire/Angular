import { Component, OnInit, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
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
    return { 'background-color' : this.buttonConfig.customCss['background-color'],
      'color' : this.buttonConfig.customCss['color']
    };
  } 

}

export class ButtonConfig{
  customCss : CustomCss
  icon : string;
  text : string;
}

export class CustomCss{

  'color' : string;
  'background-color' : string;
}
