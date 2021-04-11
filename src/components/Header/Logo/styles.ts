import tw, { styled } from "twin.macro"
import { Link } from 'gatsby';
import { motion } from "framer-motion"


export const Logo = styled(motion(Link))`
  ${tw`flex items-center mr-auto text-gray-50 hover:text-gray-300`};
`;

export const Text = styled.p`
  ${tw`text-lg font-nunitosans font-bold mb-0`};
`;

export const SvgContainer = styled.span`
  ${tw`w-16 md:w-20`};
`;