import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

const AppLanding = () => {
  const history = useHistory();

  useEffect(() => history.replace('/'), []);

  return (
    <>
      <SEOHelmet title={'APP 접속'} />
      <div className="wrapper" />
    </>
  );
};

export default AppLanding;