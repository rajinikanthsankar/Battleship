import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FeedbackMessage, FeedbackRelayService } from '../services/feedback.relay.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-run-settings',
  templateUrl: './run-settings.component.html'
})
export class RunSettingsComponent {
  public output;
  public urlBase;
  public feedback: any;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private feedbackRelayService: FeedbackRelayService,
    public settingsService: SettingsService,
  ) {
    this.urlBase = baseUrl;
    }
  public ngOnInit() {
    // display the latest success message
    //this.feedback = this.feedbackRelayService.message();
    //if (!this.feedback.applicationSeq) {
     // this.router.navigate([this.feedback.returnUrl], { replaceUrl: true });
  }

  public Run() {
    this.settingsService.runSettings(this.urlBase).subscribe(res => {
      this.feedback = res
    }, error => this.feedback = error
    );
  }
  }
  




