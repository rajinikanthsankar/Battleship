import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ISettings, ISequence } from './settings.model';
import { FeedbackMessage, FeedbackRelayService } from '../services/feedback.relay.service';
export { ISettings, FeedbackMessage };

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient, private feedbackRelayService: FeedbackRelayService) { }

  public submitSettings(body: ISequence, baseUrl: string): Observable<FeedbackMessage> {
    return this.http.put(baseUrl + 'api/Settings/Set', JSON.stringify(body), httpOptions)
      .catch(e => this.handleError(e));
  }

  public runSettings(baseUrl: string): Observable<string> {
    let body = this.feedbackRelayService.message();
    return this.http.post(baseUrl + 'api/Settings/Run', JSON.stringify(body), httpOptions)
      .catch(e => this.handleError(e));
  }

  private handleError(error: any) {
    if (error.json) {
      const apiError = error.json();
      return Observable.throw(apiError);
    }
    return Observable.throw(error);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};


  //public fetchAll(): Observable<RetirementNotificationData> {
  //  return this.httpProvider.get(APIRoutes.NotificationRetirement.FetchRetirementData).catch(e => GosErrorHandler.handleError(e));
  //}

  //public fetchAdoptionPrograms(): Observable<AdoptionProgram[]> {
  //  return this.httpProvider.get(APIRoutes.Workflow.FetchAdoptionPrograms).catch(e => GosErrorHandler.handleError(e));
  //}
//}
