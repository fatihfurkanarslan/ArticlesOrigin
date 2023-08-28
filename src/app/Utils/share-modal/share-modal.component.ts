import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { platform: string, noteId: number, url: string }
  ) {
    console.log('urlllll' + this.data.url)
   }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  // shareOnWhatsApp() {
  //   const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(this.data.url)}`;
  //   console.log('urlllll' + this.data.url)
  //   window.location.href = whatsappUrl;
  // }

  // Implement your share logic here based on the platform
} 