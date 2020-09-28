import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Grant } from '../../../shared/grant.model';


@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;
  @ViewChild('.collapsible') collapseButton: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

  }

  onClick(): void {

    this.collapseButton.nativeElement.classList.toggle('active');
    const content = this.collapseButton.nativeElement.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

  }

}
