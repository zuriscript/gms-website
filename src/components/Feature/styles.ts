
import tw, { styled, css } from "twin.macro"
import {Display} from "helpers/definitions"

interface DisplayProp {
  displayProp : Display
}

export const Features = styled.div`
  ${tw`flex flex-col 
  pt-5 md:pt-14 
  pb-10 md:pb-14 
  overflow-auto`};
`;

const featureDisplayPos = (props: DisplayProp) =>
(props.displayProp === Display.LEFT ) ?
    css`${tw`
      flex flex-col md:flex-row 
      md:justify-center md:items-center
      md:space-x-10
      mx-3
      pt-9 md:pt-14`};` :
(
  (props.displayProp === Display.RIGHT ) ?
    css`${tw`
      flex flex-col md:flex-row-reverse 
      md:justify-center md:items-center
      md:space-x-10 md:space-x-reverse
      mx-3
      pt-9 md:pt-14`};` :
    css`${tw`
      flex flex-col
      items-center
      space-y-5
      pt-10 md:pt-24`};`
); 
export const Feature = styled.div<DisplayProp>`${featureDisplayPos};`;

const contentDisplayPos = (props: DisplayProp) =>
props.displayProp === Display.TOP  ?
    css`${tw`text-left md:text-center px-3 md:px-0`};` :
    css`${tw`max-w-md text-left`};`;
export const FeatureContent = styled.div<DisplayProp>`${contentDisplayPos};`;

export const FeatureTitle = styled.p`
  ${tw`
  text-xl md:text-2xl
  font-bold font-nunitosans`};
`;

export const FeatureText = styled.p`
  ${tw`
  text-base
  font-nunitosans`};
`;


export const MarkdownContent = styled.div`
  /* Inline code */
  .language-text {
    background: #feebc8;
    color: #2d3748;
    border-radius: 5px;
    ${tw`font-mono 
    overflow-auto 
    w-screen sm:w-auto
    `};
  }
`;
