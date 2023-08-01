import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


  openDialog() {
    console.log('here')
    this.dialogRef.open(HistoryComponent)
  }
}
