const Tag = require('../models/tag')

exports.createtag = async(req,res)=>{
    try{
        const {name , desc} = req.body
        if(!name || !desc){
            res.status(400).json({
                success : false,
                message : "fill all the details to create tag"
            })
        }
        const createTag = await Tag.create({
            name , desc
        })
        res.status(200).json({
            success : "true",
            message : "Tag  created successfully"
        })
    }catch(err){
        res.json({
            success : false,
            message : "something went wrong while creating tag"
        })
    }
}
exports.getAllTag = async(req,res)=>{
    try{
        const allTags = await Tag.find({},{name : true , desc : true})
        res.status(200).json({
            success : false,
            message : "all tags fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong while fetching all tags"
        })
    }
}