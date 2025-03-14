import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  classList: any;
  nextElementSibling: any;
  hash: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Only execute this code in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScripts();
    }
  }

  private initializeScripts() {
    /**
     * Easy selector helper function
     */
    const select = (el: any, all = false) => {
      el = el.trim();
      if (all) {
        return document.querySelectorAll(el);
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type: any, el: any, listener: any, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e: any) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /**
     * Scroll to an element with header offset
     */
    const scrollto = (el: any) => {
      let header = select('#header');
      let offset = header?.offsetHeight || 0;

      let elementPos = select(el)?.offsetTop || 0;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    };

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active');
        } else {
          backtotop.classList.remove('active');
        }
      };
      window.addEventListener('load', toggleBacktotop);
      window.addEventListener('scroll', toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', (e: any) => {
      let navbar = select('#navbar');
      if (navbar) {
        navbar.classList.toggle('navbar-mobile');
      }

      e.target.classList.toggle('bi-list');
      e.target.classList.toggle('bi-x');
    });

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', (e: any) => {
      let navbar = select('#navbar');
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        e.preventDefault();
        let dropdown = e.target.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle('dropdown-active');
        }
      }
    }, true);

    /**
     * Scroll with offset on page load with hash links in the URL
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  }
}
