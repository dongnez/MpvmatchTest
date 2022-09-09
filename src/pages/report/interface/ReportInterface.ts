
export type filterType = any | 'All';


export interface ReportContextModel  {
    user:any,
    filterGateways:filterType,
    filterProjects:filterType,
    allProjects:[],
    allGateways:[],
    getGateways: ()=>void,
    getProjects: ()=>void,
    setFilterGateways: (type:filterType)=>void,
    setFilterProjects: (type:filterType)=>void,
}