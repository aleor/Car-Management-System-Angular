import { NgModule } from '@angular/core';
import { ValidationService } from '../../core/services/validation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormRoutingModule } from './login-form-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    LoginFormRoutingModule,
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [ LoginFormRoutingModule.components ],
  providers: [ValidationService]
})
export class LoginFormModule { }
