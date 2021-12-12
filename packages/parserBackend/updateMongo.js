const MapCoordsModel = require('./mongooseModels/regionsCoords')
const StatisticsModel = require('./mongooseModels/statistics')

// const set1 = [[43.61517971861919, 47.628629653156075], [43.7799479386435, 47.30188525428194], [44.27425259871643, 47.539718953118346], [44.18637621470346, 46.913112905186296], [43.81290158264836, 46.3625423383675], [43.26367418256735, 46.16509535433018], [44.065620951867565, 45.86747098898345], [44.38417284391459, 45.537597398273164], [45.83413318012844, 44.996429969951855], [47.33901625635045, 44.708299996320726], [47.580676312386096, 45.20577720705818], [47.82233636842174, 45.27538903925559], [47.45984628436827, 45.65289064337002], [46.811757952272664, 45.54529098398433], [46.361391484206216, 45.982085303638286], [46.57009789623701, 46.44574452162733], [46.888649788284, 46.46088019372851], [46.92160343228886, 46.92800023343634], [46.57009789623701, 47.391081856765254], [45.76822589211873, 47.78374401012956], [45.28490578004744, 48.13682210307711], [44.988322984003666, 48.334368571095276], [44.50500287193236, 48.202755677477214], [44.010698211859484, 47.78374401012956]]



// const geometry = {
// 	coordinates: [
// 		set1
// 	],
// 	type: "Multipolygon"
// }

// const filter = { 'properties.name_ru': "Калмыкия" };
// const update = { geometry };

const updateMongo = async () => {
	console.log('updating ...')
	const statistics = await StatisticsModel.find({ regionName: "Российская Федерация" })
	// const years = await StatisticsModel.distinct('regionName')
	console.log({ statistics })
	statistics.forEach(async (stat) => {

		const newStatistics = {
			mainSections: [
				...stat.mainSections.map(ms => {
					console.log({ ms })
					return {
						...ms,
						subSections: [
							...ms.subSections.map(ss => ({
								orderNumber: 9,
								yo: 1,
								name: 'yo',
								children: ss.children,
								yearValues: ss.yearValues,
							}))
						]
					}
				})
			]
		}

		// console.log(JSON.stringify(newStatistics))
		// console.log(newStatistics.mainSections[0].subSections)

		const filter = { regionName: "Российская Федерация" };
		const update = newStatistics

		const statistics = await StatisticsModel.findOneAndUpdate(filter, update)
		// console.log(statistics.mainSections[0].subSections)
	})


	console.log('finished ...')
}

module.exports = updateMongo