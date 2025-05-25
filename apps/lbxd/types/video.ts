
export interface VideoItem {
  src: string;
  title?: string;
  description?: string;
}

export interface VideoConfig {
  defaultBlur: number;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  showControls: boolean;
  allowBlurAdjustment: boolean;
}
