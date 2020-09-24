import { Component, Input, OnInit } from '@angular/core';
import { Grant } from '../../../shared/grant.model';

@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;

  constructor() { }

  ngOnInit(): void {
  }

}
