import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(private dialogRef: MatDialogRef<PopupComponent>) {} // Inject MatDialogRef

  close() {
    this.dialogRef.close(); // Close the dialog
  }
}
