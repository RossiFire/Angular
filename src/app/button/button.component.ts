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
}

export class ButtonConfig{
  customCss : string
  icon : string;
  text : string;
}
