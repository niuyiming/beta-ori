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
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService, DeveloperProfile, User, LoginService} from '../../core';

@Component({
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

    developerProfile: DeveloperProfile = undefined;
    isProfileConfirmed: boolean = false;
    developerId: number;

    userName: string;
    isAuthenticated: boolean;

    constructor (private profileService: ProfileService,
                    private route: ActivatedRoute,
                    private loginService: LoginService,
                    private router: Router) {}

    ngOnInit() {
        this.fetchLoggedInUser();
    }

    fetchLoggedInUser() {
        this.loginService.getUserDetails().subscribe(
            (user: User) => {
                this.userName = user.name;
                this.isAuthenticated = true;
            },
            (error) => {
                this.isAuthenticated = false;
                this.router.navigateByUrl('/login');
            }
            );
    }

    logout() {
        this.loginService.logout().subscribe(
                () => {
                    this.invalidateUser();
                    this.router.navigate(['/login']);
                },
                () => {
                    this.invalidateUser();
                    this.router.navigate(['/login']);
                }
            );
    }

    invalidateUser() {
        this.isAuthenticated = false;
        try {
            localStorage.removeItem('uid');
        } catch (ex) {} // Catching just in case uid does not exist
    }
}
