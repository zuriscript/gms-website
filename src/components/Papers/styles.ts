
import tw, { styled } from "twin.macro"



export const Papers = styled.div`
  ${tw`flex flex-col bg-gray-100
  pt-5 md:pt-14 
  pb-10 md:pb-14 
  overflow-auto
  items-center`};
`;

export const Paper = styled.div`
${tw`
px-3 md:px-0
max-w-4xl`};
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
