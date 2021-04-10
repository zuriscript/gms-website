import { motion } from "framer-motion";
import { AnimationDisplayParams, Display } from "helpers/definitions";
import tw, { styled } from "twin.macro"


export const Header = styled.header`
  ${tw`bg-background border-b border-gray-200 -mb-px`};
`;

export const Wrapper = styled(motion.div)<AnimationDisplayParams>`
  ${tw`flex flex-wrap w-full mx-auto px-5 pt-5 pb-2 items-center`};
  ${params => 
    params.shouldAnimate ? 
      (params.display == Display.LEFT ? tw`max-w-screen-md` : tw`max-w-full`) : 
      (params.display == Display.LEFT ? tw`max-w-full` : tw`max-w-screen-md`) 
    }
`;
