
import tw, { styled, css } from "twin.macro"
import {Display} from "helpers/definitions"

export const Features = styled.div`
  ${tw`flex flex-col 
  pt-5 md:pt-14 
  pb-10 md:pb-14 
  overflow-auto`};
`;

interface DisplayProp {
  displayProp : Display
}

const displayPos = (props: DisplayProp) =>
(props.displayProp === Display.LEFT ) ?
css`${tw`md:flex-row md:space-x-10`};` :
(
  (props.displayProp === Display.RIGHT ) ?
    css`${tw`md:flex-row-reverse md:space-x-10 md:space-x-reverse`};` :
    css`${tw`space-y-10`};`
); 

export const Feature = styled.div`
${displayPos};
${tw`
    flex flex-col 
    md:justify-center md:items-center
    mx-3
    pt-9 md:pt-14`};
`;

export const FeatureContent = styled.div`
  ${tw`max-w-md`};
`;

export const FeatureTitle = styled.h1`
  ${tw`
  text-xl md:text-2xl
  text-center md:text-left
  font-bold font-nunitosans`};
`;

export const FeatureText = styled.p`
  ${tw`
  text-base
  text-center md:text-left
  font-nunitosans`};
`;


export const MarkdownContent = styled.div``;
