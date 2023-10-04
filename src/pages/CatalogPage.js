import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/ApiConnector'
import { categories } from '../services/apis'
import { useState } from 'react'
import { getCategoryPageDetails } from '../services/operations/CategoryPageApi'
import CourseSlider from '../components/core/catalogPage/CourseSlider'
import { useSelector } from 'react-redux'
import CourseCard from '../components/core/catalogPage/CourseCard'
import Footer from '../components/core/homepage/Footer'
function CatalogPage() {
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.categories?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
           
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCategoryPageDetails(categoryId);
            
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
    },[categoryId]);
    const allCourseCategory = catalogPageData?.allCategory
    const courses = allCourseCategory
    console.log(courses)
return (
     <div className='mx-auto text-white '>
            <div className='flex flex-col gap-[12px] bg-richblack-800  py-[32px] px-[90px] items-start justify-between'>
                <p className='text-[14px] text-[400] leading-[22px] text-richblack-600'>Home / Catalog / <span className='text-yellow-100'> {catalogPageData?.categoryCourses?.name}</span></p>
                <p className='text-[500] text-[30px] leading-[38px] text-richblack-50'>{catalogPageData?.categoryCourses?.name}</p>
                <p className='text-[400] text-[14px] leading-[22px] text-[#999DAA]'>{catalogPageData?.categoryCourses?.desc}</p>
            </div>
        
            <div className='py-[32px] px-[90px] flex flex-col gap-[40px] '>
                <p className='text-[600] text-[38px] leading-[38px]'>Courses to get you started</p>
                <div className='text-[16px] text-[400] w-[8%]  leading-[24px]'>
                    <p className='text-yellow-100 border-b-2 mx-autoborder-yellow-100'>Most Popular</p>
                    
                </div>
                <div>
                    {
                        (catalogPageData?.categoryCourses?.courses?.length > 0 ) ? (<CourseSlider Courses={catalogPageData?.categoryCourses?.courses}/>) : 
                        <div className='text-richblack-200 text-2xl'>No Courses Found {catalogPageData?.categoryCourses?.name}</div>
                    }
                </div>
            </div>
            
            <div className='py-[32px] px-[90px] flex flex-col gap-[40px]'>
                <p className='text-[600] text-[38px] leading-[38px]'>Top Courses in {catalogPageData?.differentCategory?.name}</p>
                <div>
                    {   
                        (catalogPageData?.differentCategory?.courses?.length > 0) ? (<CourseSlider Courses = {catalogPageData.differentCategory.courses}/>)
                        : <div className='text-richblack-200 text-2xl'>No Courses Found in {catalogPageData?.differentCategory?.name} </div>
                    } 
                </div>
            </div>
          
            <div className='py-[32px] px-[90px] flex flex-col gap-[40px] '>
                <p className='text-[600] text-[38px] leading-[38px] '>Explore Our Collections</p>
                <div className='grid grid-cols-3 gap-4  gap-y-8  '>
                    {
                            catalogPageData?.allCategory?.map((category) => category.courses.map((course, index) => (
                                <CourseCard course={course} key={index}/>
                            )) )
                        
                        }
                </div>
            </div>
            
            <div>
                <Footer/>
            </div>
    </div>
    
  )
}

export default CatalogPage
