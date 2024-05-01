
import Employee from "../Models/emploeeModel.js";

const addEmployee= async (req,res)=>{
    console.log(req.body);
try {
   Employee.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
            { name: 'William Riker', age: 29, rank: 'Commander' },
            { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
            { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
            { name: 'Worf', age: 24, rank: 'Lieutenant' }

        // {name:req.body.name,age:req.body.age,rank:req.body.rank},

    ])
    res.status(200).send('emploeee added')
} catch (error) {
    console.log(error);
    res.status(500).json({message:"internal serve error"})
}
}


const CountEmploy=async (req,res)=>{
    try {
        const record=await Employee.aggregate([
            {
                $group:{
                    _id:"$age",
                     count:{$sum:1}
                    }
                }
        ])
        console.log(record);
        res.status(200).json(record)
    } catch (error) {
        res.status(500).json('internal server erroe')
    }

}

const CountByAgeGreater=async(req,res)=>{
    try {
        const record=await Employee.aggregate([
            {
                $match:{
                    age:{$gte:28}
                }
            }
        ])
        console.log(record);
        res.status(200).json(record)

    } catch (error) {
      console.log(error);
}
}

const calculateAge=async(req,res)=>{
 try {
    const count=await Employee.aggregate([
        {
            $match:{
                age:{$gte:28}
            }
        }
        ,
        {
            $group: {
                _id:null,  // Grouping all documents together
                totalCount: { $sum: 1 },
                totalAge:{$sum:"$age"} // Counting the documents
                }
        },
        {
            $project:{
                _id:0,
                totalCount:1,
                totalAge:1,
                avgAge:{$divide:["$totalAge","$totalCount"]}
            }
        }
    ])
    console.log(count);
    res.status(200).send(count)
 } catch (error) {
    
 }
}
export { addEmployee,CountEmploy,CountByAgeGreater,calculateAge}
