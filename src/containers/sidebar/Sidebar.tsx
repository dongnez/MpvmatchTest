import styles from './sidebar.module.css'
import SidebarIcons from './SidebarIcons'
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.sidebar_container}>
      
      <div className={styles.sidebar_icons}>
        {SidebarIcons.map((item,index)=>{
          return(
            <div key={index} onClick={()=>{navigate(item.path)}}>
              <img src={item.icon} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Sidebar