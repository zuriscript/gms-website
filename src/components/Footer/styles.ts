
import tw, { styled } from "twin.macro"

export const Footer = styled.footer`
  ${tw` flex flex-col md:flex-row 
  place-items-center md:items-center
  bg-background
  overflow-x-hidden   
  min-h-screen
  max-w-full
  shadow-inner py-12 md:py-5`};
`;

export const TextContainer = styled.div`
  ${tw`lg:pr-28 lg:max-w-2xl 3xl:pr-20 3xl:max-w-4xl`};
`;

export const CenteredTextContainer = styled.div`
  ${tw`flex flex-col items-center`};
`;

export const FooterLinkContainer = styled.div`
  ${tw`flex items-end space-x-3 sm:space-x-5 pt-4`};
`;

export const Dot = styled.div`
  ${tw`w-1 h-1 bg-white rounded-full place-self-center`};
`;

export const Link = styled.a`
  ${tw`text-gray-50 hover:text-green-400 hover:cursor-pointer text-xs`};
`;

export const CopyrightText = styled.p`
  ${tw`pt-5 text-gray-100 text-xs text-center`};
`;


export const Title = styled.p`
  ${tw`text-xl sm:text-5xl
  font-semibold
  text-white font-nunitosans`};
`;

export const LogoLinkSection = styled.div`
  ${tw`py-3 flex max-w-sm space-x-5 place-self-center`};
`;

export const Text = styled.p`
  ${tw`
  text-base
  text-white 
  font-medium
  font-nunitosans`};
`;

export const Emoji = styled.p`
  ${tw`
  text-4xl`};
`;

export const FatText = styled.p`
  ${tw`
  text-lg
  text-white 
  font-semibold
  font-nunitosans`};
`;
