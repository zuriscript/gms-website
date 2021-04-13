export type ObjectType = Record<string, any>;

export interface SectionTitle {
  title: string;
  subtitle: string;
}

export enum Display
{
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP"
}

export enum Length
{
  VERY_SHORT,
  SHORT,
  MEDIUM,
  LONG,
  VERY_LONG
}

export enum Height
{
  VERY_SMALL,
  SMALL,
  MEDIUM,
  BIG,
  VERY_BIG
}

export enum Tone
{
  GREEN_BRIGHT,
  GREEN_MEDIUM,
  GREEN_DARK,
  BLUE_BRIGHT,
  BLUE_MEDIUM,
  BLUE_DARK,
  YELLOW_BRIGHT,
  YELLOW_MEDIUM,
  YELLOW_DARK,
  RED_BRIGHT,
  RED_MEDIUM,
  RED_DARK,
}

export interface LineParams {
  height: Height;
  length: Length;
  tone: Tone;
  display: Display;
}    

export interface AnimationDisplayParams { display: Display; shouldAnimate: boolean}