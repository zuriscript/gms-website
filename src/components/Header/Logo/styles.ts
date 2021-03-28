import tw, { styled } from "twin.macro"
import { Link } from 'gatsby';

export const Logo = styled(Link)`
  ${tw`flex items-center mr-auto text-gray-50 hover:text-gray-300`};
`;

export const Text = styled.h1`
  ${tw`text-lg`};
`;
