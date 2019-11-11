import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogOut(){
    this.authService.logout();
  }
  
  navTo(){
    this.router.navigate(['auth'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
