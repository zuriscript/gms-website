import tw, { styled } from "twin.macro"
import { Link } from 'gatsby';

export const Logo = styled(Link)`
  ${tw`flex items-center mr-auto text-indigo-900 hover:text-indigo-900`};
`;

export const Text = styled.h1`
  ${tw`text-lg`};
`;
