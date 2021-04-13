
import tw, { styled } from "twin.macro"

export const PaperSection = styled.div`
  ${tw`bg-gray-100
  pt-5 md:pt-14
  pb-5 md:pb-10  `};
`;

export const Title = styled.p`
  ${tw`
  text-center 
  text-3xl
  text-black font-nunitosans
  pb-5`};
`;

export const Papers = styled.div`
  ${tw`flex flex-col bg-gray-100
  overflow-auto
  items-center`};
`;

export const Paper = styled.div`
  ${tw`
  px-3 lg:px-0
  md:w-full lg:w-7/12
  pb-5`};
`;

export const PaperTitle = styled.p`
  ${tw`
  text-base
  text-left
  font-bold 
  font-nunitosans`};
`;

export const PaperAuthors = styled.p`
  ${tw`
  text-base
  text-left
  font-nunitosans`};
`;

export const PaperPostScriptum = styled.p`
  ${tw`
  text-sm
  text-gray-600
  text-left
  font-nunitosans`};
`;

export const PaperLink = styled.a`
  ${tw`relative text-indigo-700 border-b border-transparent hover:text-indigo-900 ml-2`};
  
  width: max-content;
  
  &.active {
    ${tw`border-indigo-600`};
  }

  &:before {
    ${tw`absolute w-full bg-indigo-600 h-px left-0 invisible`};
    content: '';
    bottom: -1px;
    transform: scaleX(0);
    transition: 0.2s;
  }

  &:hover:before {
    ${tw`visible`};
    transform: scaleX(1);
  }
`;
