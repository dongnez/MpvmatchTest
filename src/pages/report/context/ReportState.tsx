import React, { useContext, useReducer } from 'react'
import { filterType, ReportContextModel } from '../interface/ReportInterface';
import ReportContext from './ReportContext'
import  ReportReducer  from './ReportReducer';

const ReportState = (props:{children:React.ReactNode}) => {

    const initState:ReportContextModel = {
        user:null,
        allGateways:[],
        allProjects:[],
        filterGateways:'All',
        filterProjects:'All',
        getGateways() {},
        getProjects() {},
        setFilterGateways() {},
        setFilterProjects(){},
    }

    const [state,dispatch] = useReducer(ReportReducer,initState);

    const getGateways = async ()=>{
      const gateways = await fetch('http://178.63.13.157:8090/mock-api/api/gateways')
      .then((res)=> res.json())
      .then((res)=> res.data)

      dispatch({type:'getGateways',payload:gateways})
    }

    const getProjects = async ()=>{
      const projects = await fetch('http://178.63.13.157:8090/mock-api/api/projects')
      .then((res)=> res.json())
      .then((res)=> res.data);

      dispatch({type:'getProjects',payload:projects});
    }

    const setFilterGateways = (type:filterType)=>{
      dispatch({type:'setFilterGateways',payload:type})
    }

    const setFilterProjects = (type:filterType)=>{
      dispatch({type:'setFilterProjects',payload:type})
    }

  return (
    <ReportContext.Provider value={{
        user:state.user,
        allProjects:state.allProjects,
        allGateways:state.allGateways,
        filterProjects:state.filterProjects,
        filterGateways:state.filterGateways,
        getGateways,
        getProjects,
        setFilterGateways,
        setFilterProjects,
    }}>
        {props.children}
    </ReportContext.Provider>
  )
}

export default ReportState