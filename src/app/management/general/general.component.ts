import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectEdit(data) {
      switch (data) {
        case 'holidays':
          this.router.navigate(['/management/holiday-management']);
          break;
      }
  }
}
