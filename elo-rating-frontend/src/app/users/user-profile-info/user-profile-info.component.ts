import { CommonService } from './../../core/shared/common.service';
import { User } from './../shared/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css']
})
export class UserProfileInfoComponent implements OnInit {

  @Input() user: User;

  timezones: string[];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getTimezones().then(timezones => this.timezones = timezones);
  }

  isUserTimezone(timezone: string): boolean {
    return timezone.search(this.user.timezone) !== -1 ? true : false;
  }
}
