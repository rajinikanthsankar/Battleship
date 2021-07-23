import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackRelayService } from '../services/feedback.relay.service';
import { ISequence, ISettings } from './settings.model';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent {
  public forecast;
  public form: FormGroup;
  public formBuilder: FormBuilder;  
  public urlBase;
  public turrentLocations: TurrentLocations[];
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    public router: Router,
    public route: ActivatedRoute,
    public feedbackRelayService: FeedbackRelayService,
    public settingsService: SettingsService,
  ) {
    this.form = new FormGroup({
      sequences: new FormControl(''),
      settings: new FormGroup({
    
        caliber: new FormControl(''),
        location: new FormControl(''),
        startPoint: new FormControl(''),
        endPoint: new FormControl('')
      }),
      settings1: new FormGroup({
        
        caliber: new FormControl(''),
        location: new FormControl(''),
        startPoint: new FormControl(''),
        endPoint: new FormControl('')
      }),      
      settings2: new FormGroup({
       
        caliber: new FormControl(''),
        location: new FormControl(''),
        startPoint: new FormControl(''),
        endPoint: new FormControl('')
      })      
    });

    this.turrentLocations = [

      new TurrentLocations(TurrentLocationEnum.Bow, "Bow"),
      new TurrentLocations(TurrentLocationEnum.Stern,"Stern")
    ]
    this.form.patchValue({ sequences: "1" });
    this.urlBase = baseUrl;
   // alert(this.urlBase);
    http.get(baseUrl + 'api/Settings/Get').subscribe(result => {
      this.forecast = result;
    }, error => console.error(error));
  }

  public Set() {
    let form = this.form.value;
    let sequences = form.sequences;
    if (sequences == 1) {
      if (form.settings.caliber == '' && form.settings.location == '' && form.settings.startPoint == '' && form.settings.endPoint == '')
        alert("Please enter the values for Settings1");
    }
    
    let settings = {
      sequences: form.sequences,
      settings1: {        
        caliber: form.settings.caliber,
        location: form.settings.location,
        startPoint: form.settings.startPoint,
        endPoint: form.settings.endPoint,
      }as ISettings,
      settings2: {        
        caliber: form.settings1.caliber,
        location: form.settings1.location,
        startPoint: form.settings1.startPoint,
        endPoint: form.settings1.endPoint,
      } as ISettings,
      settings3: {       
        caliber: form.settings2.caliber,
        location: form.settings2.location,
        startPoint: form.settings2.startPoint,
        endPoint: form.settings2.endPoint,
      } as ISettings,
    } as ISequence;
    

    this.settingsService.submitSettings(settings, this.urlBase).subscribe(result => {
      const feedback = result;
      feedback.sequenceId = result.sequenceId;
      this.feedbackRelayService.setFeedbackMessage(feedback);
      alert('Accepted the settings.')
      this.router.navigate(['/run-settings']);
    },error=>console.error(error)
    );
    //this.http.put(this.urlBase + 'api/Settings/Set', JSON.stringify(settings), httpOptions).
    //  subscribe(result => {
    //    const feedback = result;
    //    feedback.sequenceId = settings.sequenceId;// todo add a service to access the controller
    //    this.router.navigate(['/run-settings']);
    //}, error => console.error(error));
  }

  public isSettings(tab: number) {//2
    
    return (this.form.controls.sequences.value == tab || this.form.controls.sequences.value == tab+1);      
  }
}

export enum TurrentLocationEnum {
  Unknown = 0,
  Bow = 1,
  Stern = 2,
}

export class TurrentLocations {
  public id: number;
  public desc: string;
  constructor(private _id: number, private _desc: string) {
    this.id = _id;
    this.desc = _desc;
  }
}

