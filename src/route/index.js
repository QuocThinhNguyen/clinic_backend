import homePageRouter from "./web.js"
import userRouter from "./UserRouter.js"
import clinicRouter from "./ClinicRouter.js"

const routes = (app) => {
    app.use('/', homePageRouter)
    app.use('/user', userRouter)
    app.use('/clinic', clinicRouter)

}

export default routes