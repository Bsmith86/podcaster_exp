import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import SearchBar from "material-ui-search-bar";
import Card from '../../components/card'

import { DashboardContext } from '../../contexts';
import UploadComponent from '../../components/UploadComponent';
import axios from 'axios';
import LoadingCard from '../../components/loadingCard';

import Amplify, { API } from 'aws-amplify';

const myAPI = "api36e7f243";
const path = "/test";


const Dashboard = ({ user, signOut}) => {
  let {
    dashboardState, 
    setDashboardState,
    dashboardPodcasts,
    setDashboardPodcasts
  } = useContext(DashboardContext)

  const [searchbar, setSearchbar] = useState('')
  const [cards, setCards] = useState([1,2,3,4,5])

useEffect(() => {
  API.get(myAPI, path + "/" + "123")
    .then((res) => {
    })
    .catch((error) => {
    })
}, [])


const getRandomPodcasts = () => {
  // axios({
  //   method: "GET",
  //   url: "get_random_podcast_data"
  // }).then(async (res) => {
  //   console.log(res)
    
  //   let fullArray = await Promise.all(
  //     res.data.map((podcast) => {
  //       console.log(podcast)
  //       return new Promise(resolve => {
  //         axios({
  //           method: "POST",
  //           url: "/get_podcast_participants",
  //           data: podcast
  //         }).then((userInfo) => {
  //           console.log(userInfo)
  //           resolve({
  //             ...podcast,
  //             users: userInfo.data
  //           }) 
  //         })
  //       })
  //     })
  //   )
  //     console.log(fullArray)
  //   if (res.data) {
  //     setDashboardPodcasts(fullArray)

  //   }
  // })
  axios({
    method: "GET",
    url: "/item"
  }).then((res) => {
  })
}

  // useEffect(() => {
  //   getRandomPodcasts()
  // }, []);


const returnCards = () => {
  const arr = dashboardPodcasts.map((data) => {
    return <Card key={data.dataId} data={data} />
  })
  return arr
}

const returnLoadingCards = () => {
  const arr = array.map((card) => {
    return <LoadingCard key={card}/>
  })

  return arr
}

    
let array = [1,2,3,4,5]


  const handleSearch = () => {
  }


const ExploreComponent = (
        <div>
        {/* <SearchBar
          value={searchbar}
          className="searchbar"
          onChange={(newValue) => setSearchbar(newValue)}
          onRequestSearch={() => handleSearch()}
        /> */}
        <div className='card-container'>
          {dashboardPodcasts.length ? returnCards() : returnLoadingCards()}
        </div>
      </div>
)
const UpperText = (
  <div id="upper-text-container">
  <div id="greeting">¡Hola Aina! ¿Qué quieres escuchar hoy?</div>
  <div className="sub-heading">Últimos podcasts de tu centro</div>
  </div>
)
  return (
    <div className='dashboard-container'>
      {UpperText}
      {!dashboardState ?
        <UploadComponent />
         :
         ExploreComponent
      }
    </div>
  )
}

export default Dashboard