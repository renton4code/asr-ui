export interface SoundBankState {
  soundList: Sound[];
  isListLoadng: boolean;
}

export interface Sound {
  id: number;
  title: string;
  duration: number;
  relatedSounds?: number[];
}
