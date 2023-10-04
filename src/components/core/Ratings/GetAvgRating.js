export function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0)
    return 0

    const totalRatings = ratingArr?.reduce((acc,curr)=>{
        acc += curr
        return acc
    },0)
    const multiplier = Math.pow(10, 1)
    const avgReviewCount = Math.round((totalRatings / ratingArr?.length) * multiplier) / multiplier
  
    return avgReviewCount
}



