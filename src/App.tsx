import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './App.css'

import { ConnectComponent as LC1ConnectComponent, addEventListener } from './LC1'
import { ErrorDescriptions, States, StateDescriptions } from './LC1Data'

import { AfrGauge } from './components/AfrGauge'
import { WarmupGauge } from './components/WarmupGauge'


function App() {
  const [state, setState] = useState({stateId: States.Unknown, afr: -1, warmup: -1, lambda: -1, errorCode: -1})

  let displayComponent = getDisplayType()

  function getDisplayType() {

    if (state.stateId === States.Unknown) {
      return <span>Connect to an LC-1</span>
    }

    if (state.stateId === States.Warmup) {
      return <WarmupGauge warmup={state.warmup}></WarmupGauge>
    }

    if (state.stateId === States.Normal) {
      return <AfrGauge afr={state.afr}></AfrGauge>
    }
    
    if (state.stateId === States.Error) {
      const errorDescription = ErrorDescriptions[state.errorCode];
     
      return <span>Error: {errorDescription}</span>
    }
  }

  function updated({state: newState, prevState}) {

    const newStateName = StateDescriptions[newState.stateId]
    const oldStateName = StateDescriptions[prevState.stateId]

    if (newState.stateId !== prevState.stateId) {
      console.log(`State Changed from ${oldStateName} to ${newStateName}`)
    }

    //debugger
    setState(newState)
  }

  addEventListener('update', updated)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
        <div className="App">
          <span>Mode: {StateDescriptions[state.stateId]}</span>
          <LC1ConnectComponent></LC1ConnectComponent>
          {displayComponent}


        </div>
    </ThemeProvider>
  )
}

export default App