import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { MailChimp } from '@components';
import { ThemeContext } from '../../pages/index';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`;
const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 35px;
  ${media.desktop`font-size: 35px;`};
  ${media.tablet`font-size: 30px;`};
`;

const StyledDescription = styled.div`
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
`;

const Contact = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);
  const mode = useContext(ThemeContext);

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledHeading>What&apos;s Next?</StyledHeading>

      <StyledTitle>{title}</StyledTitle>

      <StyledDescription dangerouslySetInnerHTML={{ __html: html }} color={mode} />

      <MailChimp />
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
