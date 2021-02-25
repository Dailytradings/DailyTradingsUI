import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locked-panel',
  templateUrl: './locked-panel.component.html',
  styleUrls: ['./locked-panel.component.scss']
})
export class LockedPanelComponent implements OnInit {

  @Input() dataSize;

  constructor() { }

  ngOnInit(): void {
  }

}
