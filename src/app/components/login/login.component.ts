/**
* Copyright 2016 - 29cu.io and the authors of beta-ori open source project

* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at

*     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

import {Component} from '@angular/core';
import {Router} from '@angular/router';
// import * as toastr from 'toastr';
import {LoginService} from '../../core';
import {Location} from '@angular/common';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private error: string = undefined;

  constructor(private router: Router,
              private loginService: LoginService,
              private location: Location) {
  }

  login(email, password) {
    this.loginService.login(email, password)
      .subscribe(() => {
         this.location.back();
      }, this.handleError)
    ;
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        this.error = 'Email or password is wrong.';
        // toastr.error('Email or password is wrong.');
    }
  }
}
