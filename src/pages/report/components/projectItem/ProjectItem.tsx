import { useContext, useEffect ,useState} from "react";
import ReportContext from "../../context/ReportContext";
import { getData, getTotalAmout } from "../../helpers/reportHelper"
import styles from './projectItem.module.css'

const   ProjectItem = (props:{project:any,gateway?:boolean,openData?:boolean}) => {


        const [containP, setContainP] = useState(Array<any>);
        const [openData,setOpenData] = useState(false);
        const {allGateways,filterGateways,setFilterGateways,setFilterProjects} = useContext(ReportContext);


        useEffect(()=>{
            const aux:any = allGateways[filterGateways];
            getData(aux ? aux.gatewayId:'',props.project.projectId).then((res)=>(setContainP(res)));
        },[setFilterGateways,setFilterProjects])
        
       
    
    return (
    <div >
        {!props.openData &&
        <div onClick={()=> setOpenData(!openData)} className={styles.projectItem_container} style={{display:'flex'}}>
            <h4>{props.project.name}</h4>
            <div style={{flex:'1'}}/>
            <h4>TOTAL: {getTotalAmout(containP).toFixed(2)} USD</h4>
        </div>}

        { (openData || props.openData) && 
        <div style={{maxHeight:props.openData ? 'fit-content':'220px',overflow:'auto',padding:'10px 5px'}}>
            
            
                {/* Title */}
                <div style={{background:'white',display:'grid',gridTemplateColumns:props.gateway ? '1fr 2fr  1fr':'2fr 2fr 2fr 1fr' ,padding:'5px'}} >
                        <p style={{alignItems:'start'}}>Date</p>
                        <p style={{alignItems:'center',display:props.gateway ? 'none':''}}>Gateway</p>
                        <p style={{alignItems:'center'}}>Transaction ID</p>
                        <p style={{alignItems:'start'}}>Amount</p>
                </div>

            {containP.map((item,index)=>{
                
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

export default ProjectItem