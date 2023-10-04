import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses?.map((course)=> course?.courseName),
        datasets: [
            {
                data: courses?.map((course)=> course?.totalStudents),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses?.map((course)=> course?.courseName),
        datasets: [
            {
                data: courses?.map((course)=> course?.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create options
    const options = {
      legend: {
        display: false, // Hide dataset labels in legend
      },
      tooltips: {
        enabled: false, // Hide tooltips
      },
    };
    
    
    


  return (
    <div className='bg-richblack-800 rounded-md w-[100%] p-3 '>
      <p className={`text-[600] text-[18px] leading-[26px] mb-3 text-richblack-50 `}>Visualise</p>
      <div className='flex gap-x-5 mb-5 '>
        <button className={`text-[600] text-[16px] leading-[26px] text-richblack-300  ${currChart == "students" ? "text-yellow-100  text-[18px]" : "text-richblack-300"}  `}
        onClick={() => setCurrChart("students")}
        >
            Student
        </button>

        <button className={`text-[600] text-[16px] leading-[26px] ${currChart == "income" ? "text-yellow-100 text-[18px]" : "text-richblack-300"} `}
        onClick={() => setCurrChart("income")}
        >
            Income
        </button>
      </div>
      <div>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart

