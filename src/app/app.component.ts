import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employment-Portfolio';
  windowScrolled!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.windowScrolled = scrollTop > 100;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      (function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 1.5);
        }
      })();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      /* Animation on scroll */
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
}
