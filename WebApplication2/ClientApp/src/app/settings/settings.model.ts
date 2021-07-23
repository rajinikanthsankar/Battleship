export interface ISequence {
  sequences: number;
  settings1: ISettings;
  settings2: ISettings;
  settings3: ISettings; 
}

export interface ISettings {
 
  caliber: number;
  location: number;
  startPoint: number;
  endPoint: number;
}
