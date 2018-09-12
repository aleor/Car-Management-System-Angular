import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogModalComponent } from '../../shared/dialog-modal/dialog-modal.component';

@Component({
  selector: 'pms-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackService: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChanged
            .subscribe((isAuthenticated) => {
                this.isLoggedIn = isAuthenticated;
            },
            (err: any) => console.log(err));
  }

  logIn() {
    this.redirectToLoginPage();
  }

  logOut() {
    this.authService.logout()
              .subscribe((status: boolean) => {
                  // this.setLoginButtonText();
                  this.snackService.open('You\'ve been successfully logged out',
                    null,
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message']
                    });

                  this.router.navigate(['/cars']);
                  return;
              },
              (err: any) => console.log(err));
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  reports() {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '300px',
      disableClose: false,
      autoFocus: false,
      data: {
        message: 'Feature is under development. Please check later.',
        confirmButtonText: 'OK',
        cancelButton: false,
        headerText: 'Under development'
      }
    });
  }
}
