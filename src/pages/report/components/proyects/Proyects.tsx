import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/Colors';
import NoRImage from '../../assets/NoRImage.png'
import ReportContext from '../../context/ReportContext'
import { getData, getTotal, getTotalAmout } from '../../helpers/reportHelper';
import Chart from '../chart/Chart';
import GatewayItem from '../gatewayItem/GatewayItem';
import ProjectItem from '../projectItem/ProjectItem';
import styles from './proyects.module.css'

const Proyects = (props:{}) => {
    const {allProjects,allGateways,filterProjects,filterGateways,setFilterGateways} = useContext(ReportContext);
    const proyects = allProjects;
    const [fullTotal,setFullTotal] = useState(0);
    const [prices,setPrices] = useState([])
    

    useEffect(()=>{
        const aux:any = filterGateways != 'All' ? allGateways[filterGateways]:null;
        const aux2:any = filterProjects != 'All' ?  allProjects[filterProjects]:null;

        getData(aux ? aux.gatewayId:'',aux2 ? aux2.projectsId:'')
        .then((res)=>res)
        .then((res)=>(getTotalAmout(res))).then((res)=> setFullTotal(res))

        if(filterGateways != 'All') getProjectsPrices();
        if(filterProjects != 'All') getGatewaysPrices();
        
        
    },[setFilterGateways,setFilterGateways])

    function filterP(){
        if(filterProjects == 'All') return 'All projects'
        return `Project ${filterProjects+1}`
    }

    function filterG(){
        if(filterGateways == 'All') return 'All gateways'
        return `Gateway ${filterGateways+1}`
    }

    async function getProjectsPrices(){
        const id:any = allGateways[filterGateways];


        let data:any = [];
        for (let index = 0; index < allProjects.length; index++) {
            const id:any = allProjects[index];
            

           const dataAux =  await getData(id.gatewayId,id.projectId)
            .then((res)=>{
                return getTotalAmout(res);
            })      
            
            
            data =  data.concat(dataAux);
        }

        setPrices(data);
    }   

    async function getGatewaysPrices(){
        const idProjects:any = allProjects[filterProjects]; 

        let data:any = [];
        for (let index = 0; index < allGateways.length; index++) {
            const idGateways:any = allGateways[index];

           const dataAux =  await getData(idGateways.gatewayId,idProjects.projectId)
            .then((res)=>{
                return getTotalAmout(res);
            })      
            
            data =  data.concat(dataAux);
        }

        setPrices(data);        
    }   
    
    function filterComponents(){

        if((filterProjects == 'All' && filterGateways == 'All' ) ){
            return (<>{allProjects.map((item:any,index)=>{
                        return (
                            <div key={index}>
                                <ProjectItem project={item} />
                            </div>
                        )
                    })}</>)
        }

        if((filterProjects != 'All' && filterGateways != 'All' )){
            return (<>{allProjects.map((item:any,index)=>{
                        if(index == filterProjects)
                        return (
                            <div key={index}>
                                <ProjectItem openData={true} gateway={true} project={item} />
                            </div>
                        )
                    })}</>)
        }

        if((filterProjects == 'All' && filterGateways != 'All' )){
            return (<>{allProjects.map((item:any,index)=>{
                        return (
                            <div key={index}>
                                <ProjectItem gateway={true} project={item} />
                            </div>
                        )
                    })}</>)
        }

        if((filterProjects != 'All' && filterGateways == 'All' )){
            return (<> {allGateways.map((item:any,index)=>{
                return (
                    <div key={index}>
                        <GatewayItem gateway={item} />
                    </div>
                )
            })}</>)
        }


    }
    
    function filterSubComponents(){
        if((filterProjects == 'All' && filterGateways == 'All' )){
            return(<div className={styles.project_container}>
                        <h4>TOTAL: {fullTotal.toFixed(2)} USD</h4>
                    </div>)
        }

        if((filterProjects != 'All' && filterGateways != 'All' ) ){
            return (<div className={styles.project_container}>
                        <h4 >TOTAL: {fullTotal.toFixed(2)} USD</h4>
                    </div>)
        }


        // * Chart
        let choose = true; //FilterProject Select
        if(filterGateways != 'All') choose = false; //FilterGateways Select 

        return(
            <div style={{width:'60%'}}>
                <div style={{display:'flex',alignItems:'center',gap:'15px'}} className={styles.project_container}>
                    {prices.map((item,index)=>{
                        return(
                        <div style={{display:'flex',alignItems:'center',gap:'5px'}} key={index}>
                            <div style={{borderRadius:'5px',height:'15px',width:'15px',background:Colors[index]}} />
                            <p style={{fontFamily:'Roboto'}}> {choose ? 'Project':'Gateway'} {index}</p>
                        </div>)
                    })}
                </div>
                <Chart  arraydata={prices} size='300px' />
                <div className={styles.project_container}>
                    <h4>{choose ? 'PROJECT' :'GATEWAY'} TOTAL: { choose ? getTotal(prices).toFixed(2):fullTotal.toFixed(2) } USD</h4>
                </div>

            </div>
        )

    }
    
    function filterStyle(){
        if((filterProjects != 'All' && filterGateways != 'All') || (filterProjects == 'All' && filterGateways == 'All')) 
            return {}

        return {display:'flex',gap:'20px'}
    }

  return (
    <div style={{width:'100%',height:'100%',fontFamily:'Roboto'}}>
        
        {!proyects &&
         <div style={{textAlign:'center',width:'470px',margin:'auto',position:'relative',top:'150px'}}>
            <h1>No reports</h1>
            <p style={{color:'#7E8299',fontWeight:'700',margin:'4px 0 51px 0'}}>Currently you have no data for the reports to be generated. 
            Once you start generating traffic through the Balance application 
            the reports will be shown.</p>
            <img src={NoRImage} alt="" />
        </div>}
        
        {proyects  &&
        <div style={filterStyle()}>
            <div className={styles.project_container}>
                <h4 style={{marginBottom:'30px'}}>{filterP()} | {filterG()}</h4>
                {filterComponents()}
            </div>
                {filterSubComponents()}
        </div>}

    </div>
  )
}

export default Proyects