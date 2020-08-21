import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() public CurrentComp:any;

  public isHomeActive:boolean=false;
  public isStatsActive:boolean=false;


  constructor() { }

  ngOnInit() {

    // check for current component being active
    if(this.CurrentComp==='home')
    {
      this.isHomeActive=true;
      this.isStatsActive=false;
    }
    else if(this.CurrentComp==='stats')
    {
      this.isStatsActive=true;
      this.isHomeActive=false;
    }
  }

}
