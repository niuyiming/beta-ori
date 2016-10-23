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

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService, User} from '../../core';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userName: string;
    isAuthenticated: boolean;

    constructor(private loginService: LoginService,
                private router: Router) {

    }

    ngOnInit() {
        this.fetchLoggedInUser();
    }

    fetchLoggedInUser() {
        this.loginService.getUserDetails().subscribe(
            (user: User) => {
                this.validateUser(user);
                this.router.navigateByUrl('/');
            },
            (err: Error) => {
                // User is not logged in! 
            }
        );
    }

    logout() {
        this.loginService.logout().subscribe(
            response => this.invalidateUser()
        );
    }

    validateUser(user: User) {
        if (user !== undefined) {
            this.userName = user.name;
            localStorage.setItem('uid', user.rid.toString());
            this.isAuthenticated = true;
        }
    }

    invalidateUser() {
        this.userName = undefined;
        localStorage.removeItem('uid');
        this.isAuthenticated = false;
    }
}