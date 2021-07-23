import { Injectable } from '@angular/core';

/**
 * Current angular 2 router doesn't support passing dynamic data object during 'navigate' to route.
 * This singleton service is soley used for passing feedback message between form component and success 'page'.
 */
@Injectable()
export class FeedbackRelayService {
    private feedbackMessage: FeedbackMessage;
    constructor() {
        this.feedbackMessage = new FeedbackMessage();
    }

    public setFeedbackMessage(feedback: FeedbackMessage) {
        this.feedbackMessage = feedback;
    }

    public message(): FeedbackMessage {
        return this.feedbackMessage;
    }
}

export class FeedbackMessage {
    public sequenceId: number;
    public caliber: number;
    public location: number;
    public startPoint: number;
    public endPoint: number;   

    constructor() {
      this.sequenceId = undefined;
      this.caliber = undefined;
      this.location = undefined;
      this.startPoint = undefined;
      this.endPoint = undefined;
        
    }
}
