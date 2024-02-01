import { children } from './assets/resorce/children.js'

const player: {
	money: number
	workPower: number
	childCount: number
	cafChildCount: number
	momChildCount: number
	gmoChildCount: number
	hammerURL: string
	hammerCount: number
	hammerPrice: number
	hammerPower: number
} = {
	money: 0,
	workPower: 0,
	childCount: 0,
	cafChildCount: 0,
	momChildCount: 0,
	gmoChildCount: 0,
	hammerURL: 'assets/images/hammer.png',
	hammerCount: 1,
	hammerPrice: 10000,
	hammerPower: 1
}

const money = document.getElementById('money-counter') as HTMLHeadingElement
const childTotalIncome = document.getElementById('child-income-total') as HTMLHeadingElement
const hammer = document.getElementById('hammer') as HTMLImageElement

const newHammer = document.getElementById('new-hammer') as HTMLHeadingElement

const child = document.getElementById('child') as HTMLImageElement
const childCounter = document.getElementById('child-counter') as HTMLHeadingElement
const childIncome = document.getElementById('child-income') as HTMLHeadingElement
const childPrice = document.getElementById('child-price') as HTMLHeadingElement
const childPriceIncrease: number = 100
const childStartPrice: number = 70
const childStartPower: number = 1

const cafChild = document.getElementById('cafChild') as HTMLImageElement
const cafChildCounter = document.getElementById('cafChild-counter') as HTMLHeadingElement
const cafChildIncome = document.getElementById('cafChild-income') as HTMLHeadingElement
const cafChildPrice = document.getElementById('cafChild-price') as HTMLHeadingElement
const cafChildPriceIncrease: number = 2000
const cafChildStartPrice: number = 1000
const cafChildPower: number = 10

const momChild = document.getElementById('momChild') as HTMLImageElement
const momChildCounter = document.getElementById('momChild-counter') as HTMLHeadingElement
const momChildIncome = document.getElementById('momChild-income') as HTMLHeadingElement
const momChildPrice = document.getElementById('momChild-price') as HTMLHeadingElement
const momChildPriceIncrease: number = 1500
const momChildStartPrice: number = 700
const momChildPower: number = 6

const gmoChild = document.getElementById('gmoChild') as HTMLImageElement
const gmoChildCounter = document.getElementById('gmoChild-counter') as HTMLHeadingElement
const gmoChildIncome = document.getElementById('gmoChild-income') as HTMLHeadingElement
const gmoChildPrice = document.getElementById('gmoChild-price') as HTMLHeadingElement
const gmoChildPriceIncrease: number = 2500
const gmoChildStartPrice: number = 700
const gmoChildPower: number = 12

// @ts-ignore
const savedPlayer: string = JSON.parse(localStorage.getItem('player'))
if (savedPlayer) {
	Object.assign(player, savedPlayer)
}

hammer.src = player.hammerURL
newHammer.textContent = `Gold Hammer ${player.hammerPrice} $`
newHammer.addEventListener('click', () => {
	if (player.hammerPrice <= player.money) {
		if (player.hammerCount === 1) {
			player.hammerURL = 'assets/images/hammer2.png'
			player.money -= player.hammerPrice
			player.hammerCount++
			hammer.src = player.hammerURL
			player.hammerPrice = 90000
			newHammer.textContent = `Mythic Hammer ${player.hammerPrice} $`
			player.hammerPower = 100
			localStorage.setItem('player', JSON.stringify(player))
			updateCounters()
		} else if (player.hammerCount === 2) {
			player.hammerURL = 'assets/images/hammer3.png'
			player.money -= player.hammerPrice
			player.hammerCount++
			hammer.src = player.hammerURL
			player.hammerPrice = 400000
			newHammer.textContent = `caffeinated Hammer ${player.hammerPrice} $`
			player.hammerPower = 450
			localStorage.setItem('player', JSON.stringify(player))
			updateCounters()
		} else if (player.hammerCount === 3) {
			player.hammerURL = 'assets/images/hammer4.png'
			player.money -= player.hammerPrice
			player.hammerCount++
			hammer.src = player.hammerURL
			player.hammerPrice = 0
			newHammer.textContent = `MAX `
			player.hammerPower = 5000
			localStorage.setItem('player', JSON.stringify(player))
			updateCounters()
		}
	}
})

children.forEach((child) => {})

function updateCounters() {
	money.textContent = player.money.toString()

	childIncome.textContent = `${player.childCount} cash/s`
	childCounter.textContent = 'Child X ' + player.childCount.toString()
	childPrice.textContent = `${childPriceIncrease * player.childCount + childStartPrice}`

	cafChildIncome.textContent = `${player.cafChildCount * cafChildPower} cash/s`
	cafChildCounter.textContent = 'Caffeinated Child x ' + player.cafChildCount.toString()
	cafChildPrice.textContent = `${cafChildPriceIncrease * player.cafChildCount + cafChildStartPrice}`

	momChildIncome.textContent = `${player.momChildCount * momChildPower} cash/s`
	momChildCounter.textContent = 'Mommy`s Boy x ' + player.momChildCount.toString()
	momChildPrice.textContent = `${momChildPriceIncrease * player.momChildCount + momChildStartPrice}`

	gmoChildIncome.textContent = `${player.gmoChildCount * gmoChildPower} cash/s`
	gmoChildCounter.textContent = 'GMO Child x ' + player.gmoChildCount.toString()
	gmoChildPrice.textContent = `${gmoChildPriceIncrease * player.gmoChildCount + gmoChildStartPrice}`

	childTotalIncome.textContent = ` ${player.workPower} cash/s`
}

updateCounters()

hammer.addEventListener('click', () => {
	player.money += player.hammerPower
	localStorage.setItem('player', JSON.stringify(player))
	updateCounters()
})

const workerIncome = () => {
	player.money += player.workPower
	money.textContent = player.money.toString()
	/*	localStorage.setItem('player', JSON.stringify(player))*/
	childPrice.style.color = Number(childPrice.textContent) <= player.money ? 'green' : 'red'
	cafChildPrice.style.color = Number(cafChildPrice.textContent) <= player.money ? 'green' : 'red'
	momChildPrice.style.color = Number(momChildPrice.textContent) <= player.money ? 'green' : 'red'
	gmoChildPrice.style.color = Number(gmoChildPrice.textContent) <= player.money ? 'green' : 'red'
}

setInterval(workerIncome, 1000)

const handleChildClick = (
	priceIncrease: number,
	startPrice: number,
	powerIncrease: number,
	childType: keyof typeof player
) => {
	// @ts-ignore
	let price: number = priceIncrease * player[childType] + startPrice
	if (price <= player.money) {
		player.money -= price
		// @ts-ignore
		player[childType] += 1
		player.workPower += powerIncrease
	}
	localStorage.setItem('player', JSON.stringify(player))
	updateCounters()
}

child.addEventListener('click', () => {
	handleChildClick(100, 70, 1, 'childCount')
})

cafChild.addEventListener('click', () => {
	handleChildClick(2000, 1000, 10, 'cafChildCount')
})

momChild.addEventListener('click', () => {
	handleChildClick(1500, 700, 6, 'momChildCount')
})

gmoChild.addEventListener('click', () => {
	handleChildClick(1500, 700, 6, 'gmoChildCount')
})
