const Category = require('../models/category')
const Courses = require('../models/course')
function getRandomInt(max){
    return Math.floor(Math.random()*max)
}
exports.createCategory = async(req,res)=>{
    try{
        const {name,desc} = req.body

    if(!name){
       return res.json({
            success : false,
            message : "name not available"
        })
    }
    console.log("creating category")
    const createCategory = await Category.create({
       name :  name,
       desc : desc
    })
    console.log("category created")
    if(!createCategory){
        return res.json({
            success : false,
            message : "not able to create category"
        })
    }
     res.status(200).json({
        success : true,
        message : "category created sucessfull"
    })
    console.log("category : created")
    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong while creating category"
        })

    }

}
exports.getAllCategory = async(req,res)=>{
  try{
    const categories =  await Category.find({})
    if(!categories){
     return res.status(401).json({
         success : false,
         message : "not able to fetch categories",
     
     })
    }

    return res.status(200).json({
     success : true,
     message : "all categories fetched successfully",
     categories : categories

    })
  }catch(err){
    return res.json({
        success : false,
        message : "something went wrong while fetching category"
    })
  }
}

exports.getCategoryPageDetails = async(req,res)=>{
    
    try{
        const {catId} = req.body
        if(!catId){
            return res.status(404).json({
                success : false,
                message : "catId not found"
            })
        }  
    const selectedcategory = await Category.findById(catId).populate([
        {
            path : "courses",
            populate : {
                path : "instructor"
            }
        },
        {
            path : "courses",
            populate : {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
                
            }
        }
    ])

    if(!selectedcategory){
        return res.status(403).json({
            success : false,
            message : "Category not found",
        })
    }
    if(selectedcategory.courses.length == 0 ){
        return res.status(404).json({
            success :false,
            message : "no courses found in category"
        })
    }
    const categoryExeptSelected = await Category.find({_id : { $ne : catId}})
    if(!categoryExeptSelected){
        return res.status(403).json({
            success : false,
            message : "not able to fetch category exept selected"
        })
    }
    const randomIndex = getRandomInt(categoryExeptSelected.length)
    const randomCategory = categoryExeptSelected[randomIndex]
    const diffrentCatefory = await Category.findById(
       {_id : randomCategory._id }
    ).populate([
        {
            path : "courses",
            populate : {
                path : "instructor",
            }
        },
        {
            path : "courses",
            populate : {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        }
    ])
    if(!diffrentCatefory){
        return res.status(403).json({
            success : false,
            message : "not able to fetch different categories"
        })
    }
    console.log("diffren catogry printed")
    const allCategories = await Category.find({}).populate([
        {
            path: "courses",
            populate: {
                path: "instructor",
            },
        },
        {
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            },
        },
    ]).exec();
    
    if(!allCategories){
        return res.status(403).json({
            success :false,
            message : "not able to fetch all categories"
        })
    }
    return res.status(200).json({
        success : true,
        message : "categoy page details fetched successfully",
        data : {
            categoryCourses : selectedcategory,
            differentCategory : diffrentCatefory,
            allCategory : allCategories
        }
    })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            err : err.message
        })
    }
    
}

exports.deleteCategory = async(req,res)=>{
    try{
        const {catId} = req.body
    const deleteCategory = await Category.findByIdAndDelete({_id : catId})
    if(!deleteCategory){
        return res.json({
            success : false,
            message : "not able to delete category"
        })
    }
    return res.status(200).json({
        success : true,
        message : "category deleted successfully",
        deletedCat : deleteCategory
    })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "internal server error"
        })
    }
}