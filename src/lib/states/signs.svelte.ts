type Direction = {
	name: string
	symbols: string[]
	distance: number
}

export type SignPost = {
	name: string
	postNumber: string
	description: string
	location: {
		lat: number
		lng: number
	}
	post: {
		diameter: number
		height: number
	}
	signs: Sign[]
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

const defaultSign: Sign = {
	id: '',
	route: {
		name: 'Neuer Weg',
		signNumber: '12345',
		direction: 'left',
		symbols: []
	},
	// provide two directions by default so UI that accesses [0] and [1] won't crash
	directions: [
		{
			name: 'Ziel 1 Neu',
			symbols: [],
			distance: 1234
		},
		{
			name: 'Ziel 2 Neu',
			symbols: [],
			distance: 4567
		}
	],
	appearance: {
		orientation: 0,
		order: 0,
		mounting: ''
	}
}

export let signPost: SignPost = $state({
	name: 'Beispiel Standort',
	postNumber: 'SP12345',
	description: 'Beschreibung des Standorts',
	location: {
		lat: 48.137154,
		lng: 11.576124
	},
	post: {
		diameter: 16,
		height: 250
	},
	signs: fakeData
})

// let signs = $state<Sign[]>(fakeData)

export const addSign = () => {
	const sign = { ...defaultSign, id: crypto.randomUUID() }
	signPost.signs = [sign, ...signPost.signs]
}

export const addSignAfter = (id: string) => {
	const existingIndex = signPost.signs.findIndex((sign) => sign.id === id)
	if (existingIndex === -1) return
	const sign = { ...defaultSign, id: crypto.randomUUID() }
	signPost.signs = [...signPost.signs.slice(0, existingIndex + 1), sign, ...signPost.signs.slice(existingIndex + 1)]
}

export const deleteSign = (id: string) => {
	signPost.signs = signPost.signs.filter((sign) => sign.id !== id)
}

export const updateSign = (updatedSign: Sign) => {
	signPost.signs = signPost.signs.map((sign) => (sign.id === updatedSign.id ? updatedSign : sign))
}

export const moveSignUp = (id: string) => {
	const index = signPost.signs.findIndex((sign) => sign.id === id)
	if (index <= 0) return

	const newSigns = [...signPost.signs]
	const temp = newSigns[index - 1]
	newSigns[index - 1] = newSigns[index]
	newSigns[index] = temp
	signPost.signs = newSigns
}

export const moveSignDown = (id: string) => {
	const index = signPost.signs.findIndex((sign) => sign.id === id)
	if (index === -1 || index >= signPost.signs.length - 1) return

	const newSigns = [...signPost.signs]
	const temp = newSigns[index + 1]
	newSigns[index + 1] = newSigns[index]
	newSigns[index] = temp
	signPost.signs = newSigns
}

export const getSign = (id: string): Sign | undefined => {
	return signPost.signs.find((sign) => sign.id === id)
}

export const getAllSigns = (): Sign[] => {
	return signPost.signs
}

export const setAllSigns = (newSigns: Sign[]) => {
	signPost.signs = newSigns
}
