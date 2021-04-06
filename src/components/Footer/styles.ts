
import tw, { styled } from "twin.macro"

export const Footer = styled.footer`
  ${tw`bg-background py-4 h-screen sm:h-auto`};
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
