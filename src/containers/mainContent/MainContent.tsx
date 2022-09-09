import React from 'react'
import styles from './mainContent.module.css'
import {Outlet} from 'react-router-dom'
import ReportState from '../../pages/report/context/ReportState'

const MainContent = () => {
  return (
    <div className={styles.mainContent_container}>
      <ReportState>
        <Outlet/>
      </ReportState>
    </div>
  )
}

export default MainContent