import React, { useState } from 'react';
import StartPage from './component/StartPage/StartPage';
import { ProviderConfigContext } from './core/ConfigContext';
import styled from 'styled-components';

const Button = styled.button`
  border: 6px solid black;
  font-size: 3rem;
  padding: 16px 80px;
  cursor: pointer;
  box-shadow: 0.3em 0.3em 0 0 black, inset 0.3em 0.3em 0 0 black;
  transition: all 300ms;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 0 black, inset 6em 3.5em 0 0 black;
    color: white;
  }
`;

const RefSource: any = styled.a`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 15px;
  color: black;
`;

const App: React.FC = () => {
  const [start, setStart] = useState(false);

  return (
    <ProviderConfigContext>
      <div className="App">
        {start ? (
          <StartPage />
        ) : (
          <Button onClick={() => setStart(true)}>Start</Button>
        )}
      </div>
      <RefSource target={'_black'} href={'https://github.com/Kam1Cadzee/maze'}>
        https://github.com/Kam1Cadzee/maze
      </RefSource>
    </ProviderConfigContext>
  );
};

export default App;
