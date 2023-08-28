import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share',
  template: `
    <p>
      Paylaşılacak platform: {{ platform }}
    </p>
  `,
  styles: []
})

export class ShareComponent implements OnInit {
  platform: string;
  noteId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.platform = this.route.snapshot.paramMap.get('platform');
    this.noteId = +this.route.snapshot.paramMap.get('noteId');

    switch (this.platform) {
      case 'link':
        // Link paylaşımını burada yapabilirsiniz
        break;
      case 'twitter':
        // Twitter paylaşımını burada yapabilirsiniz
        break;
      case 'instagram':
        // Instagram paylaşımını burada yapabilirsiniz
        break;
      case 'facebook':
        // Facebook paylaşımını burada yapabilirsiniz
        break;
      case 'whatsapp':
        this.shareOnWhatsApp();
        break;
      default:
        break;
    }
  }

  shareOnWhatsApp() {
    console.log('is triggered?')
    const noteUrl = `https://example.com/note/${this.noteId}`;
    const whatsappMessage = encodeURIComponent(`Check out this note: ${noteUrl}`);
    const whatsappUrl = `whatsapp://send?text=${whatsappMessage}`;
    window.location.href = whatsappUrl;
  }
}