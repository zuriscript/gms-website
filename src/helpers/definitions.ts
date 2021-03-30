//import { FluidObject } from 'gatsby-image';

//export type ImageSharpFluid = FluidObject | FluidObject[] | undefined;

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