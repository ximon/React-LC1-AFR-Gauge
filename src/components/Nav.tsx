import * as React from 'react'
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CableIcon from '@mui/icons-material/Cable'
import SpeedIcon from '@mui/icons-material/Speed'
import TimelineIcon from '@mui/icons-material/Timeline'
import DataObjectIcon from '@mui/icons-material/DataObject'

type OnNavEventCallback = (navId: string) => void

export function Nav({onNavEvent}:{onNavEvent: OnNavEventCallback}) {
  const [value, setValue] = React.useState(0);


    function navIdFromIndex(index: number): string {
        switch(index) {
            case 0: return 'connect'
            case 1: return 'gauge'
            case 2: return 'graph'
            case 3: return 'mockUpdate'
        }

        return ''
    }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}

        onChange={(event, newValue) => {
          setValue(newValue)
          onNavEvent(navIdFromIndex(newValue))
        }}
      >
        <BottomNavigationAction label="Connect" icon={<CableIcon />} />
        <BottomNavigationAction label="Gauge" icon={<SpeedIcon />} />
        <BottomNavigationAction label="Graph" icon={<TimelineIcon />} />
        <BottomNavigationAction label="Update" icon={<DataObjectIcon />} />
      </BottomNavigation>
    </Paper>
  );
}