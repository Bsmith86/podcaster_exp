import React , { useContext }from 'react'
import { DashboardContext } from '../../contexts';
import Card from '../../components/card'
import LoadingCard from '../../components/loadingCard';
import './index.css'
const Dashboard = () => {
    let {
        dashboardPodcasts,
        setDashboardPodcasts
      } = useContext(DashboardContext)

      let array = [1,2,3,4,5]


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
  return (
    <div className='dashboard-container'>
        <div id="upper-text-container">
            <div id="greeting">¡Hola Aina! ¿Qué quieres escuchar hoy?</div>
            <div className="sub-heading">Últimos podcasts de tu centro</div>
        </div>
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
  </div>
  )
}

export default Dashboard