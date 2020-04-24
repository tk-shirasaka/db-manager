import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class PartsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PartsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { confirm: boolean; title: string; contents: string; },
  ) { }

  onClose() {
    this.dialogRef.close();
  }
}
