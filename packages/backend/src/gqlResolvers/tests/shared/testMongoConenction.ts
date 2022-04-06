import mongoose from "mongoose"
import connectToMongo from "../../../services/connectToMongo"

const testMongoConenction = () => {
	beforeAll(async () => {
		await connectToMongo()
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})
}

export default testMongoConenction