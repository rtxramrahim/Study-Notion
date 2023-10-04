import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"
import CourseBuilderForm from "./courseForms/CourseBuilderForm"
import SectionAddingForm from "./courseForms/SectionAddingForm"
import PublishCourseForm from "./courseForms/PublishCourseForm"
export default function AddCourse(){
    const {step} = useSelector((state)=>state.course)
    return (
        <div className="text-white flex flex-row justify-between gap-3  mt-6">
            <div className="flex flex-col gap-[5px] items-center">
                
                <RenderSteps></RenderSteps>
                <div className="">
                    {step==1 && <CourseBuilderForm/>}
                    {step==2 && <SectionAddingForm></SectionAddingForm>}
                    {step==3 && <PublishCourseForm/>}
                </div>
            </div>
            <div className="w-[384px]   h-[390px] rounded-sm p-[24px] border border-[#2C333F] flex flex-col gap-[19px] items-start justify-between ">
                <p className="font-[600] text-[18px] leading-[26px] text-richblack-50">⚡ Course Upload Tips</p>
                <ul className="flex flex-col items-start gap-[11px] font-[500] text-[12px] leading-[20px]">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>
                    Add Topics in the Course Builder section to create lessons,
                    quizzes, and assignments.
                    </li>
                    <li>
                    Information from the Additional Data section shows up on the
                    course single page.
                    </li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>

    )
}