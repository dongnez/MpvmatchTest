import { ChartOptions, ChartTypeRegistry, TooltipItem, TooltipModel } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getTotal } from '../../helpers/reportHelper';
import { Colors } from '../../../../constants/Colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const options:ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display:false
    },
    tooltip: {
      callbacks: {
        label:function caca(this: TooltipModel<keyof ChartTypeRegistry>,value:TooltipItem<keyof ChartTypeRegistry>):string | string[] {
          return ` ${value.formattedValue} %`;
        },
      },
    }
  },
};

const Chart = (props:{arraydata:number[],size?:string}) => {
  
  const label = props.arraydata.map((item,index)=>{
    return `Project ${index+1}`
  })

  
  const total = getTotal(props.arraydata)
  
  const finalData = props.arraydata.map((item)=>(item/total*100).toFixed());

  const data = {
    
      datasets: [
        {
          label: '%',
          data: finalData,
          
          backgroundColor: Colors, 
          borderWidth: 1,
        },
      ],
      
      labels: label,
    };
  


  return (
    <div style={{maxWidth:props.size,margin:'auto',paddingTop:'20px'}} >
        <Doughnut
        options={options}
        data={data}
        {...props}
        />
    </div>
  )
}

export default Chart