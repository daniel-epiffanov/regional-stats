const isLoggedIn = (req: any, res: any, next: any) => {
	const { user } = req
	console.log({ user })
	if (req.user) {
		next()
	} else {
		res.sendStatus(401)
	}
}

export default isLoggedIn
