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
import {Observable} from 'rxjs/Observable';
import {DeveloperApplication, DeveloperApplicationsService} from '../../../core';

@Component({
    selector: 'bo-dev-app-details',
    templateUrl: './dev-app-details.component.html',
    styleUrls: ['./dev-app-details.component.css']
})
export class DeveloperApplicationDetailsComponent implements OnInit {

    appID = localStorage.getItem('appid');  
    devAppObservable: Observable<any>;   
    devAppsArray: DeveloperApplication[] = [];


    constructor(private developerAppsService: DeveloperApplicationsService,
                private router: Router) {}

    ngOnInit() {
        this.devAppObservable = this.developerAppsService.getApplication(this.appID);
        this.devAppObservable.forEach(next => this.devAppsArray = next);
    }    
}