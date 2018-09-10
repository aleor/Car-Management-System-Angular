import { NgModule } from '@angular/core';
import { ValidationService } from '../../core/services/validation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormRoutingModule } from './login-form-routing.module';

@NgModule({
  imports: [ ReactiveFormsModule, SharedModule, LoginFormRoutingModule ],
  declarations: [ LoginFormRoutingModule.components ],
  providers: [ValidationService]
})
export class LoginFormModule { }
