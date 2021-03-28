import tw, { styled } from "twin.macro"
import { Container } from 'components/ui/Container/styles';

export const Header = styled.header`
  ${tw`bg-background border-b border-gray-200 -mb-px`};
`;

export const Wrapper = styled(Container)`
  ${tw`items-center`};
`;
