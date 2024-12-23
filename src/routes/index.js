import homePageRouter from "./WebRouter.js"
import userRouter from "./UserRouter.js"
import clinicRouter from "./ClinicRouter.js"

import specialtyRouter from "./SpecialtyRouter.js"
import doctorInforRouter from "./DoctorRouter.js"

import bookingRouter from "./BookingRouter.js"
import patientRecordsRouter from "./PatientRecordsRouter.js"
import scheduleRouter from "./ScheduleRouter.js"
import adminRouter from "./AdminRouter.js"
import allCodeRouter from "./AllCodeRouter.js"
import {handleError} from "../middlewares/authMiddleware.js"

const routes = (app) => {
    app.use('/', homePageRouter)
    app.use('/user', userRouter)
    app.use('/clinic', clinicRouter)
    app.use('/booking', bookingRouter)
    app.use('/patientrecord', patientRecordsRouter)
    app.use('/schedule', scheduleRouter)
    app.use('/specialty', specialtyRouter)
    app.use('/doctor', doctorInforRouter)
    app.use('/admin', adminRouter)
    app.use('/allcode', allCodeRouter)
    app.use(handleError);
}

export default routes