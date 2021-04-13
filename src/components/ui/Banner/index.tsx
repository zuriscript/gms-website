import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import * as Styled from './styles';
import { GatsbyImage, getImage, withArtDirection, IGatsbyImageData } from 'gatsby-plugin-image';


interface Props {
  title: string;
  subtitle: string;
}




const Banner: React.FC<Props> = ({ title, subtitle }) => {

  const data = useStaticQuery(graphql`
  query {
    largeImage: file(relativePath: { eq: "gmsDesignNew.png" }) {
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    },
    smallImage: file(relativePath: { eq: "gmsDesignMobile.png" }) {
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`)

const images = withArtDirection(getImage(data.largeImage) as IGatsbyImageData, [
  {
    media: "(max-width: 750px)",
    image: getImage(data.smallImage) as IGatsbyImageData,
  },
])

  return(<Styled.Banner>
     <Styled.Title>{title}</Styled.Title>
     <Styled.SubTitle>{subtitle}</Styled.SubTitle>
     <Styled.ImageContainer>
        <GatsbyImage className="art-directed" image={images} alt="GMS" />
     </Styled.ImageContainer>
  </Styled.Banner>)
};

export default Banner;

{/* <Styled.ImageContainer>
        <StaticImage
        src="../../../assets/images/gmsDesign.png"
        alt="GMS"
        placeholder="blurred"/>
   </Styled.ImageContainer>  */}
