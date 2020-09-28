import { Component, OnInit } from '@angular/core';
import { Grant } from '../../shared/grant.model';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin-grants',
  templateUrl: './admin-grants.component.html',
  styleUrls: ['./admin-grants.component.scss']
})
export class AdminGrantsComponent implements OnInit {
  grants: Grant[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    const subG = this.adminService.getGrants().subscribe(
      grants => {
        this.grants = grants;
        subG.unsubscribe();
      },
      error => {
        console.log(error);
      }
    );
  }

}
