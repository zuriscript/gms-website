import tw, { styled } from "twin.macro"
import { StaticImage } from "gatsby-plugin-image"

export const Banner = styled.section`
  ${tw`bg-background flex flex-col justify-center items-center`};
`;

export const Title = styled.h1`
  ${tw`bg-background text-center 
        text-gray-50
        text-xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-extrabold font-nunitosans`};
`;

export const SubTitle = styled.h2`
  ${tw`mb-8 text-center 
        md:mt-2
        text-gray-50
        text-xs sm:text-lg md:text-xl lg:text-2xl 
        font-semibold font-nunitosans`};
`;

export const ImageContainer = styled.div`
${tw`w-7/12 h-auto pb-20`};
`;
