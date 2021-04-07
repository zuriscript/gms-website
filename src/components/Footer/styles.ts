
import tw, { styled } from "twin.macro"

export const Footer = styled.footer`
  ${tw`bg-background py-4 min-h-screen flex flex-col justify-center overflow-hidden`};
`;

export const CopyrightText = styled.p`
  ${tw`pt-10 text-gray-100 text-xs text-center font-semibold`};
`;

export const Links = styled.div`
  ${tw`flex items-center justify-center w-full`};

  a {
    ${tw`text-gray-50 hover:text-green-400 mx-2`};
  }
`;

export const Link = styled.a`
  ${tw`text-gray-50 hover:text-green-400 mx-2`};
`;
