import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupsuccess',
  templateUrl: './popupsuccess.component.html',
  styleUrls: ['./popupsuccess.component.css']
})
export class PopupsuccessComponent {
  constructor(private dialogRef: MatDialogRef<PopupsuccessComponent>) {} // Inject MatDialogRef

  close() {
    this.dialogRef.close(); // Close the dialog
  }

}
