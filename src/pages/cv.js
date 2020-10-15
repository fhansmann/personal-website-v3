import React from 'react';
import { Layout } from '@components';
import styled from 'styled-components';
import { Main, mixins } from '@styles';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`;

const CV = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>CV</title>
      <link rel="canonical" href="https://florians.dev/cv" />
    </Helmet>

    <StyledMainContainer>
      <div> Work in Progress ;-) </div>
      <StyledHomeButton to="/">Go Home</StyledHomeButton>
    </StyledMainContainer>
  </Layout>
);

CV.propTypes = {
  location: PropTypes.object.isRequired,
};
export default CV;
