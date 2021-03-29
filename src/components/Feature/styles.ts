
import tw, { styled } from "twin.macro"

export const Features = styled.div`
  ${tw`flex flex-col pt-10`};
`;

export const Feature = styled.div`
  ${tw`
    flex flex-col md:flex-row justify-center
    items-center
    pt-5`};
`;

export const FeatureContent = styled.div`
  ${tw`max-w-md pr-10`};
`;

export const FeatureTitle = styled.h1`
  ${tw`
  text-2xl
  font-bold font-nunitosans`};
`;

export const FeatureText = styled.p`
  ${tw`
  text-base
  font-nunitosans`};
`;


export const MarkdownContent = styled.div`
  a {
    text-decoration: none;
    position: relative;
    background-image: linear-gradient(
      rgba(255, 250, 150, 0.8),
      rgba(255, 250, 150, 0.8)
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }
  a > code:hover {
    text-decoration: underline;
  }
`;