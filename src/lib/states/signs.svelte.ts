type Direction = {
	name: string
	symbols: string[]
	distance: number
}

export type Sign = {
	id: string
	route: {
		name: string
		signNumber: string
		direction: 'left' | 'right' | 'both'
		symbols: string[]
	}
	directions: Direction[],
	appearance: {
		orientation: number
		order: number
		mounting: string
	}
}

const fakeData: Sign[] = [
	{
		id: 'id12345',
		route: {
			name: 'Weg A',
			signNumber: 'schild123',
			direction: 'left',
			symbols: ['gebietswegBalken', 'hauptwegBalken']
		},
		directions: [
			{
				name: 'Ziel A',
				symbols: ['hotel'],
				distance: 1200
			},
			{
				name: 'Ziel B',
				symbols: [],
				distance: 0
			}
		],
		appearance: {
			orientation: 90,
			order: 1,
			mounting: 'schelle'
		}
	},
	{
		id: 'id67890',
		route: {
			name: 'Weg B',
			signNumber: 'schild456',
			direction: 'right',
			symbols: ['rundwegDreieck']
		},
		directions: [
			{
				name: 'Ziel C',
				symbols: ['fastfood', 'hospital'],
				distance: 800
			},
			{
				name: 'Ziel D',
				symbols: ['parking'],
				distance: 0
			}
		],
		appearance: {
			orientation: 45,
			order: 2,
			mounting: 'schelle'
		}
	}
]

let signs = $state<Sign[]>(fakeData)

export const addSign = (sign: Sign) => {
	signs = [...signs, sign]
}

export const insertSignAfter = (id: string, sign: Sign) => {
	const existingIndex = signs.findIndex((sign) => sign.id === id)
	if (!existingIndex) return
	signs = [...signs.slice(0, existingIndex + 1), sign, ...signs.slice(existingIndex + 1)]
}

export const deleteSign = (id: string) => {
	signs = signs.filter((sign) => sign.id !== id)
}

export const updateSign = (updatedSign: Sign) => {
	signs = signs.map((sign) => (sign.id === updatedSign.id ? updatedSign : sign))
}

export const getSign = (id: string): Sign | undefined => {
	return signs.find((sign) => sign.id === id)
}

export const getAllSigns = (): Sign[] => {
	return signs
}
