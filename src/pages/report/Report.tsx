import styles from './report.module.css'
import React, { useContext, useEffect, useState } from 'react'
import {Proyects, ReportHead} from './components'
import ReportContext from './context/ReportContext';


const Report = () => {
    const {getGateways,getProjects,allGateways,allProjects} = useContext(ReportContext);
    const [selectProyects,setSelectProyects] = useState();
    

    useEffect(()=>{
        getGateways();
        getProjects();
    },[]);


   return (
        <div className={styles.report_container}>
            <ReportHead/>
            <Proyects />
        </div>
  )
}

export default Report