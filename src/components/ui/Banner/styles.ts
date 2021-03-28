import tw, { styled } from "twin.macro"

export const Banner = styled.section`
  ${tw`bg-background flex flex-col justify-center`};
`;

export const Title = styled.h1`
  ${tw`bg-background text-center 
        text-gray-50
        text-xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-extrabold font-nunitosans`};
`;

export const SubTitle = styled.h2`
  ${tw`mb-8 text-center 
        text-gray-50
        text-xs sm:text-lg md:text-xl lg:text-2xl 
        font-semibold font-nunitosans`};
`;
