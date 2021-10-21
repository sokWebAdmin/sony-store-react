import React, { useEffect } from 'react';

const AppBar = ({ agent }) => {
  const init = () => {
    console.log(agent);
  };

  useEffect(init, []);

  return (
    <h1>하이 난 앱바</h1>
  );
};

export default AppBar;