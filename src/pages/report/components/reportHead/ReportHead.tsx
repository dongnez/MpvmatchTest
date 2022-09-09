import { useContext, useState } from 'react'
import styles from './reportHead.module.css'
import arrowIcon from '../../assets/arrow.png'
import calendarIcon from '../../assets/Calendar.png'
import ReportContext from '../../context/ReportContext'

type modalArrayType = 'Project' | 'Gateway' | 'Date' ;

const GreenButton = (props:{name:string,icon:string,modalArray:[], type:modalArrayType})=>{
    
     const [openSelect,setOpenSelect] = useState(false);
     const {setFilterGateways,setFilterProjects}= useContext(ReportContext);


      function getTypeinfo(type:modalArrayType){
        switch (type) {
            case 'Project':
                    return 'Project'
            
            case 'Gateway':
                return 'Gateway'
        
            default: 
                return 'Date'
        }
      }

      function setTypeInfo(type:modalArrayType,data:any){
        switch (type) {
            
            case 'Project':
                data =='All' ? setFilterProjects('All'):setFilterProjects(data)
                break;

            case 'Gateway':
                data =='All' ? setFilterGateways('All'):setFilterGateways(data)
                break;
            default:
                break;
        }
      }

      function getTypeName(type:modalArrayType){
        
        switch (type) {
            case 'Project':
                    return 'All Projects'
            
            case 'Gateway':
                return 'All Gateways'
            
            case 'Date':
                return 'Date'
                
            default: 
                return props.name
        }
      }

      

    return(
        <div style={{position:'relative',maxWidth:'200px',fontFamily:'Roboto'}}>
            <button onClick={()=>setOpenSelect(!openSelect)} className={styles.greenButton}>
                {props.name == 'All' ? getTypeName(props.type):`${getTypeinfo(props.type)} ${props.name}`}
                <img src={props.icon} alt="" />
            </button>
            
            {openSelect &&
            <div style={{position:'absolute',marginTop:'5px',zIndex:'1',width:'100%',background:'white',borderRadius:'5px',boxShadow:'1px 1px 5px 1px #00000057'}}>
                <div  style={{textAlign:'center',padding:'5px'}}>
                        <p onClick={()=>{setTypeInfo(props.type,'All');setOpenSelect(false)}} className={styles.selectText}>All {props.type}s</p>
                </div>
                {props.modalArray.map((item,index)=>{
                    return(
                    <div key={index} style={{textAlign:'center',padding:'5px'}}>
                        <p onClick={()=>{setTypeInfo(props.type,index);setOpenSelect(false)}} className={styles.selectText}>{getTypeinfo(props.type)} {index}</p>
                    </div>)
                })}

                
            </div>}

        </div>
    )
}

const ReportHead = () => {
    
  const {allProjects,allGateways,filterProjects,filterGateways} = useContext(ReportContext);

  return (
    <div className={styles.reportHead_container}>

        <div>
            <h1 style={{fontFamily:'Roboto',fontSize:'24px'}}>Reports</h1>
            <p style={{color:'#7E8299',fontFamily:'Roboto',fontWeight:'700',fontSize:'16px'}}>Easily generate a report of your transactions</p>
        </div>
        
        <div style={{flex:'1'}}/>

        <div style={{display:'flex',gap:'23px'}}>
            <GreenButton name={filterProjects} icon={arrowIcon} modalArray={allProjects} type={'Project'}/>
            <GreenButton name={filterGateways} icon={arrowIcon} modalArray={allGateways} type={'Gateway'}/>
            <GreenButton name='From date' icon={calendarIcon}  modalArray={[]} type={'Date'}/>
            <GreenButton name='To date' icon={calendarIcon} modalArray={[]} type={'Date'}/>    
            <button className={styles.generateButton}>Generate Report</button>
        </div>
        

    </div>
  )
}

export default ReportHead