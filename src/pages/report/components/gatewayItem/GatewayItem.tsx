import React, { useContext, useEffect, useState } from 'react'
import ReportContext from '../../context/ReportContext';
import { getData, getTotalAmout } from '../../helpers/reportHelper';
import styles from './gatewayItem.module.css'

const GatewayItem = (props:{gateway:any}) => {
    
    const [containG, setContainG] = useState(Array<any>);
    const [openData,setOpenData] = useState(false);
    const {allProjects,filterProjects,setFilterGateways,setFilterProjects} = useContext(ReportContext);

    useEffect(()=>{
        const aux:any = allProjects[filterProjects];
        getData(props.gateway.projectId,aux ? aux.gatewayId:'').then((res)=>(setContainG(res)));
    },[])

 return (
    <div >
        
        <div onClick={()=> setOpenData(!openData)} className={styles.projectItem_container} style={{display:'flex'}}>
            <h4>{props.gateway.name}</h4>
            <div style={{flex:'1'}}/>
            <h4>TOTAL: {getTotalAmout(containG).toFixed(2)} USD</h4>
        </div>

        {openData && 
        <div style={{maxHeight:'200px',overflow:'auto',padding:'10px 5px'}}>
            
            
                {/* Title */}
                <div style={{background:'white',display:'grid',gridTemplateColumns:props.gateway ? '1fr 2fr  1fr':'2fr 2fr 2fr 1fr' ,padding:'5px'}} >
                        <p style={{alignItems:'start'}}>Date</p>
                        <p style={{alignItems:'center',display:props.gateway ? 'none':''}}>Gateway</p>
                        <p style={{alignItems:'center'}}>Transaction ID</p>
                        <p style={{alignItems:'start'}}>Amount</p>
                </div>

            { containG.map((item,index)=>{
                
                return (<div style={{background:(index % 2 !== 0) ? 'white':'none' , display:'grid',gridTemplateColumns:props.gateway ? '1fr 2fr  1fr':'2fr 2fr 2fr 1fr',padding:'5px'}} key={index}>
                        <p style={{alignItems:'start'}}>{item.created}</p>
                        <p style={{alignItems:'center',display:props.gateway ? 'none':''}}>Gateway {index + 1}</p>
                        <p style={{alignItems:'center'}}>{item.paymentId}</p>
                        <p style={{alignItems:'end'}}>{item.amount}</p>
                        </div>)
            })}
            
        </div>}

    </div>
  )
}

export default GatewayItem