import express from 'express'
import { addEmployee,CountByAgeGreater,CountEmploy,calculateAge} from '../controllers/employeeController.js'
const employeeRuter=express.Router()

employeeRuter.post("/",addEmployee)
employeeRuter.post("/count",CountEmploy)
employeeRuter.get("/countByAgeGreater",CountByAgeGreater)
employeeRuter.get('/calc',calculateAge)




export default employeeRuter