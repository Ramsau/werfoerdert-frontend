import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Grant } from '../../../shared/grant.model';


@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;
  @ViewChild('collapseContent') collapseContent: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.collapseContent.nativeElement.classList.toggle('active');
  }

}