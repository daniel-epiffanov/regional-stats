import { Router } from 'express'

const expressRouter = Router()

expressRouter.get('/', (req: any, res: any) => {
	res.send('Hello World!')
})

export default expressRouter
