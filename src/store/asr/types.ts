export interface AsrState {
  availableAsrList: AsrPreset[];
  isListLoadng: boolean;
}

export interface AsrPreset {
  name: string;
  settings: Setting[];
}

export interface Setting {
  name: string;
  title: string;
  type: string;
  defaultValue: any;
}
