import { ReportContextModel } from './../interface/ReportInterface';

type ReportAction = | {type:'getUser',payload:any}
                    | {type:'getProjects',payload:any}
                    | {type:'getGateways',payload:any}
                    | {type:'setFilterGateways',payload:any}
                    | {type:'setFilterProjects',payload:any}
                    
                    

export default (state:ReportContextModel,action:ReportAction):ReportContextModel =>{
    switch (action.type) {
        case 'getUser':
            return{
                ...state,
                user:action.payload
            }
        
        case 'getProjects':

            return{
                ...state,
                allProjects: action.payload
            }
        
        case 'getGateways':

        return{
            ...state,
            allGateways: action.payload
        }

        case 'setFilterGateways':
            return{
                ...state,
                filterGateways:action.payload
            }
        
        case 'setFilterProjects':
        return{
            ...state,
            filterProjects:action.payload
        }
            
        default:
            return state
            
    }
}