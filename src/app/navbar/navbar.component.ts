import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string
  
  constructor(private dialogRef: MatDialog) {
    this.username = 'Harish'
  }

  openDialog() {
    console.log('here')
    this.dialogRef.open(HistoryComponent)
  }
}
