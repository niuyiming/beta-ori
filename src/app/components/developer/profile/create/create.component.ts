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
import {ProfileService, DeveloperProfile} from '../../../../core';

@Component({
    selector: 'bo-developer-profile-create',
    templateUrl: './create.component.html'
})
export class DeveloperProfileCreateComponent implements OnInit {

    developerProfile: DeveloperProfile = {rid: undefined, email: undefined, description: undefined, website: undefined, company: undefined};

    constructor(private profileService: ProfileService, private router: Router) {}

    ngOnInit() {}

    onSubmitCreateProfile() {
        this.profileService.createDeveloperProfile(+sessionStorage.getItem('uid'), this.developerProfile).subscribe(
            (response) => {
                if (response.status === 200) {
                // Success response, so lets go back to the developer home page.
                    this.router.navigate(['/developer']);
                }
            }
        );
    }
}
