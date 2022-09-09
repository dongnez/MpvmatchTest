import React from 'react'
import styles from './topbar.module.css'
import Logo from '../../assets/logo.png'
import Menu from '../../assets/menu.png'

const Topbar = () => {
  
  
  return (
    <div className={styles.topbar_container} >
      <div className={styles.topbar_content}>
        
        <img style={{marginRight:'21px'}} src={Logo}/>
        <img src={Menu}/>

        <div style={{flex:1}}/>

        <h2 style={{fontFamily:'Roboto',fontSize:'23px',background:'#F6CA65',padding:'10px',borderRadius:'5px',color:'white',marginRight:'11px'}}>JD</h2>
        <p style={{fontFamily:'Roboto',fontWeight:'700',fontSize:'16px',color:'#005B96',marginRight:'65px'}}>Jhon Doe</p>
      </div>

      <div style={{height:'2px',width:'100%',background:'#F3F6F9'}}/>

    </div>
  )
}

export default Topbar