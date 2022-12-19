import React, { useState, createContext } from 'react'

export const DashboardContext = createContext();

export function DashboardProvider (props) {

    const [dashboardState, setDashboardState] = useState(true);
    const [dashboardPodcasts, setDashboardPodcasts] = useState([]);
    // const [dashboardPodcasts, setDashboardPodcasts] = useState([
    //   {
    //     dataId: '0',
    //     podcastId: '5bfe7e42-17b1-4a81-a207-38d60aa7566c',
    //     date: '2022-04-23',
    //     title: 'Podcast Title',
    //     description: 'podcast description'
    //     },
    //     {
    //      dataId: '096cf8dd-45d1-4ee6-b4e4-363c0c44326b',
    //      podcastId: 'e38277d1-15f5-4a89-b51e-074f546b6a3d',
    //      date: '2022-04-23',
    //      title: 'Podcast Title',
    //      description: 'podcast description'
    //    },
    //    {
    //          dataId: '10',
    //          podcastId: 'e53b1f0c-46a9-4a3a-a429-51db839bdb68',
    //          date: '2022-04-23',
    //          title: 'Podcast Title',
    //          description: 'podcast description'
    //     }
    // ]);

      return (
        <DashboardContext.Provider value={{
            dashboardState, 
            setDashboardState,
            dashboardPodcasts,
            setDashboardPodcasts
        }}>
          {props.children}
        </DashboardContext.Provider>
      )
  }
  
  