import homePageRouter from "./web.js"
import userRouter from "./UserRouter.js"
import clinicRouter from "./ClinicRouter.js"
import specialtyRouter from "./SpecialtyRouter.js"
import doctorInforRouter from "./DoctorRouter.js"

const routes = (app) => {
    app.use('/', homePageRouter)
    app.use('/user', userRouter)
    app.use('/clinic', clinicRouter)
    app.use('/specialty', specialtyRouter)
    app.use('/doctor', doctorInforRouter)
}

export default routes