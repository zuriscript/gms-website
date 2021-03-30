
import tw, { styled, css } from "twin.macro"
import {Display} from "helpers/definitions"

export const Features = styled.div`
  ${tw`flex flex-col pt-10`};
`;

interface DisplayProp {
  displayProp : Display
}

const displayPos = (props: DisplayProp) =>
(props.displayProp === Display.LEFT ) ?
css`${tw`md:flex-row space-x-10`};` :
(
  (props.displayProp === Display.RIGHT ) ?
    css`${tw`md:flex-row-reverse space-x-10 space-x-reverse`};` :
    css`${tw`space-y-10`};`
); 

export const Feature = styled.div`
${displayPos};
${tw`
    flex flex-col justify-center
    items-center
    pt-5`};
`;

export const FeatureContent = styled.div`
  ${tw`max-w-md`};
`;

export const FeatureTitle = styled.h1`
  ${tw`
  text-2xl
  font-bold font-nunitosans`};
`;

export const FeatureText = styled.p`
  ${tw`
  text-base
  font-nunitosans`};
`;


export const MarkdownContent = styled.div`

`;
