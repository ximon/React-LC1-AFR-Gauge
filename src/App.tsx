import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './App.css'

import { addEventListener, mockUpdate } from './services/LC1'
import { ErrorDescriptions, States, StateDescriptions } from './services/LC1Data'
import { processData } from './services/LC1DataProcessor'

import { AfrGauge } from './components/AfrGauge'
import { WarmupGauge } from './components/WarmupGauge'
import { Nav } from './components/Nav'
import { createWorker } from './serialWorkerHelper';


const worker = createWorker(processData);


function App() {
  const [state, setState] = useState({stateId: States.Unknown, afr: -1, warmup: -1, lambda: -1, errorCode: -1})

  async function tryConnect() {
    try {
      const ports = await navigator.serial.getPorts()

      //we've previously connected to a port, use it
      if (ports.length === 1) {
        worker.postMessage('connect')
        return
      }

      const port = await navigator.serial.requestPort()

      if (!port) return
      
      worker.postMessage('connect')
    } catch (err) {
      console.info(err)
    }
  }


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


  async function handleNavEvent(navId) {
    if (navId === 'connect') { 
      tryConnect()
    }
    if (navId === 'gauge') {}
    if (navId === 'graph') {}
    if (navId === 'mockUpdate') mockUpdate()
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
          {displayComponent}

          <Nav onNavEvent={handleNavEvent}></Nav>
        </div>
    </ThemeProvider>
  )
}

export default App