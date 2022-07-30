import { Component, OnInit } from '@angular/core';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';

@Component({
  selector: 'alert-handler',
  templateUrl: './alert-handler.component.html',
  styleUrls: ['./alert-handler.component.scss'],
})
export class AlertHandlerComponent implements OnInit {
  isStatus: boolean = false;
  autohide: boolean = true;
  statusMessage: string = '';
  statusClass: string = '';
  constructor(private alertService: AlertHandlerService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((status) => {
      this.statusClass = 'bg-success';
      this.statusMessage = status.message;
      if (status.error) this.statusClass = 'bg-danger';

      this.isStatus = false;
      setTimeout(() => {
        this.isStatus = true;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.isStatus = false;
  }
}
