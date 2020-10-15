import React from 'react';
import PropTypes from 'prop-types';
import { FormattedIcon } from '@components/icons';
import { socialMedia } from '@config';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
  background-color: ${props => (props.color ? colors.lightNavy : colors.white)};
`;
const StyledSocial = styled.div`
  color: ${colors.lightSlate};
  width: 100%;
  max-width: 270px;
  margin: 0 auto 10px;
  display: none;
  ${media.tablet`display: block;`};
`;
const StyledSocialList = styled.ul`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledSocialLink = styled.a`
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
    fill: ${colors.lightNavy}
    }
  }
`;
const StyledMetadata = styled.div`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  line-height: 1;
`;
const StyledGitHubLink = styled.a`
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
  padding: 7px;
  margin-bottom: 5px;
`;
const StyledName = styled.div`
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
  padding: 7px;
`;

const Footer = ({ mode }) => (
  <StyledContainer color={mode}>
    <StyledSocial>
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <StyledSocialLink
                href={url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={name}>
                <FormattedIcon name={name} />
              </StyledSocialLink>
            </li>
          ))}
      </StyledSocialList>
    </StyledSocial>
    <StyledMetadata tabindex="-1">
      <StyledGitHubLink
        color={mode}
        href="https://github.com/fhansmann"
        target="_blank"
        rel="nofollow noopener noreferrer">
        Built with Gatsby | Hosted on Netlify
      </StyledGitHubLink>
      <StyledName color={mode}> Inspired by Brittany Chiang </StyledName>
    </StyledMetadata>
  </StyledContainer>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
  mode: PropTypes.bool,
};

export default Footer;
