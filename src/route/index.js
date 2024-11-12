import homePageRouter from "./web.js"
import userRouter from "./UserRouter.js"
import clinicRouter from "./ClinicRouter.js"

import specialtyRouter from "./SpecialtyRouter.js"
import doctorInforRouter from "./DoctorRouter.js"

import bookingRouter from "./BookingRouter.js"
import patientRecordsRouter from "./PatientRecordsRouter.js"
import scheduleRouter from "./ScheduleRouter.js"
import adminRouter from "./AdminRouter.js"
import allCodeRouter from "./AllCodeRouter.js"


const routes = (app) => {
    app.use('/', homePageRouter)
    app.use('/user', userRouter)
    app.use('/clinic', clinicRouter)
    app.use('/booking',bookingRouter)  
    app.use('/patientrecord',patientRecordsRouter) 
    app.use('/schedule',scheduleRouter)
    app.use('/specialty', specialtyRouter)
    app.use('/doctor', doctorInforRouter)
<<<<<<< Updated upstream:src/route/index.js
    app.use('/admin',adminRouter)
=======
    app.use('/admin', adminRouter)
    app.use('/allcode', allCodeRouter)
>>>>>>> Stashed changes:src/routes/index.js
}

export default routes