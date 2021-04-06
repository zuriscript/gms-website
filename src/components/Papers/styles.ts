
import tw, { styled } from "twin.macro"

export const PaperSection = styled.div`
  ${tw`bg-gray-100
  pt-5 md:pt-14
  pb-5 md:pb-10  `};
`;

export const Title = styled.h1`
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

export const PaperTitle = styled.h1`
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
  ${tw`text-indigo-500 pl-2 hover:text-indigo-800`};
`;
