
import tw, { styled } from "twin.macro"

export const AboutUsBanner = styled.div`
  ${tw`
  flex flex-col py-10
  items-center`};
`;

export const Title = styled.h1`
  ${tw`text-center 
  text-4xl
  text-white font-nunitosans`};
`;

export const LogoLinkSection = styled.div`
  ${tw`py-2 flex items-end max-h-20  space-x-5`};
`;

export const Text = styled.p`
  ${tw`text-center 
  text-white 
  font-nunitosans`};
`;