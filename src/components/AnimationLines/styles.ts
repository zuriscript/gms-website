
import tw, { styled } from "twin.macro"
import { motion } from 'framer-motion';
import {Display, Height, Length, LineParams, Tone} from 'helpers/definitions';

export const Canvas = styled.div`
${tw`
  flex flex-col
  items-center
  w-screen
  overflow-hidden
  pt-5`};
`;

export const Title = styled.h1`
  ${tw`text-center
  mx-2 
  text-xl sm:text-2xl
  font-semibold
  text-white font-nunitosans`};
`;

export const LogoLinkSection = styled.div`
  ${tw`py-2 flex items-end max-h-20 max-w-xs space-x-5 place-self-center`};
`;

export const Text = styled.p`
  ${tw`
  text-base
  text-white 
  font-medium
  font-nunitosans`};
`;

export const FatText = styled.p`
  ${tw`
  text-lg
  text-white 
  font-semibold
  font-nunitosans`};
`;



export interface HeightParam {height: Height}
export const Space = styled.div<HeightParam>`
  ${param => 
    {
      switch (param.height) {
        case Height.VERY_SMALL: return tw`h-2`;
        case Height.SMALL: return tw`h-4`;
        case Height.MEDIUM: return tw`h-10 md:h-6`;
        case Height.BIG: return tw`h-80`;
        case Height.VERY_BIG: return tw`h-28`;
    }}
  };
`;

export const Line = styled(motion.div)<LineParams>`
  ${tw`rounded-sm`};
  ${props => 
    {
      switch (props.height) {
        case Height.VERY_SMALL: return tw`h-2`;
        case Height.SMALL: return tw`h-4`;
        case Height.MEDIUM: return tw`h-8`;
        case Height.BIG: return tw`h-14`;
        case Height.VERY_BIG: return tw`h-28`;
    }}
  };
  ${props => 
    {
      switch (props.length) {
        case Length.VERY_SHORT: return tw`w-8 md:w-4`;
        case Length.SHORT: return tw`w-16 md:w-8`;
        case Length.MEDIUM: return tw`w-1/4 md:w-16`;
        case Length.LONG: return tw`w-1/2 md:w-32`;
        case Length.VERY_LONG: return tw`w-4/5 md:w-64`;
    }}
  };
  ${props => 
      {
        switch (props.tone) {
          case Tone.BLUE_BRIGHT: return tw`bg-indigo-400`;
          case Tone.BLUE_MEDIUM: return tw`bg-indigo-600`;
          case Tone.BLUE_DARK: return tw`bg-indigo-800`;
          case Tone.GREEN_BRIGHT: return tw`bg-green-400`;
          case Tone.GREEN_MEDIUM: return tw`bg-green-600`;
          case Tone.GREEN_DARK: return tw`bg-green-800`;
          case Tone.YELLOW_BRIGHT: return tw`bg-yellow-300`;
          case Tone.YELLOW_MEDIUM: return tw`bg-yellow-600`;
          case Tone.YELLOW_DARK: return tw`bg-yellow-800`;
          case Tone.RED_BRIGHT: return tw`bg-red-400`;
          case Tone.RED_MEDIUM: return tw`bg-red-600`;
          case Tone.RED_DARK: return tw`bg-red-800`;
      }}
    };
    ${props => 
      {
        switch (props.display) {
          case Display.LEFT: return tw`self-start sm:self-center`;
          case Display.RIGHT: return tw`self-end sm:self-center `;
          case Display.TOP: return tw`self-center`;
      }}
    };
`;