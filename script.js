import { children } from './assets/resorce/children.js';
const player = {
    money: 0,
    workPower: 0,
    childCount: 0,
    cafChildCount: 0,
    momChildCount: 0,
    gmoChildCount: 0
};
const money = document.getElementById('money-counter');
const childTotalIncome = document.getElementById('child-income-total');
const hammer = document.getElementById('hammer');
const child = document.getElementById('child');
const childCounter = document.getElementById('child-counter');
const childIncome = document.getElementById('child-income');
const childPrice = document.getElementById('child-price');
const childPriceIncrease = 100;
const childStartPrice = 70;
const childStartPower = 1;
const cafChild = document.getElementById('cafChild');
const cafChildCounter = document.getElementById('cafChild-counter');
const cafChildIncome = document.getElementById('cafChild-income');
const cafChildPrice = document.getElementById('cafChild-price');
const cafChildPriceIncrease = 2000;
const cafChildStartPrice = 1000;
const cafChildPower = 10;
const momChild = document.getElementById('momChild');
const momChildCounter = document.getElementById('momChild-counter');
const momChildIncome = document.getElementById('momChild-income');
const momChildPrice = document.getElementById('momChild-price');
const momChildPriceIncrease = 1500;
const momChildStartPrice = 700;
const momChildPower = 6;
const gmoChild = document.getElementById('gmoChild');
const gmoChildCounter = document.getElementById('gmoChild-counter');
const gmoChildIncome = document.getElementById('gmoChild-income');
const gmoChildPrice = document.getElementById('gmoChild-price');
const gmoChildPriceIncrease = 2500;
const gmoChildStartPrice = 700;
const gmoChildPower = 12;
const savedPlayer = JSON.parse(localStorage.getItem('player'));
if (savedPlayer) {
    Object.assign(player, savedPlayer);
}
children.forEach((child) => { });
function updateCounters() {
    money.textContent = player.money.toString();
    childIncome.textContent = `${player.childCount} cash/s`;
    childCounter.textContent = 'Child X ' + player.childCount.toString();
    childPrice.textContent = `${childPriceIncrease * player.childCount + childStartPrice}`;
    cafChildIncome.textContent = `${player.cafChildCount * cafChildPower} cash/s`;
    cafChildCounter.textContent = 'Caffeinated Child x ' + player.cafChildCount.toString();
    cafChildPrice.textContent = `${cafChildPriceIncrease * player.cafChildCount + cafChildStartPrice}`;
    momChildIncome.textContent = `${player.momChildCount * momChildPower} cash/s`;
    momChildCounter.textContent = 'Mommy`s Boy x ' + player.momChildCount.toString();
    momChildPrice.textContent = `${momChildPriceIncrease * player.momChildCount + momChildStartPrice}`;
    gmoChildIncome.textContent = `${player.gmoChildCount * gmoChildPower} cash/s`;
    gmoChildCounter.textContent = 'GMO Child x ' + player.gmoChildCount.toString();
    gmoChildPrice.textContent = `${gmoChildPriceIncrease * player.gmoChildCount + gmoChildStartPrice}`;
    childTotalIncome.textContent = ` ${player.workPower} cash/s`;
}
updateCounters();
hammer.addEventListener('click', () => {
    player.money += 1;
    localStorage.setItem('player', JSON.stringify(player));
    updateCounters();
});
const workerIncome = () => {
    player.money += player.workPower;
    money.textContent = player.money.toString();
    localStorage.setItem('player', JSON.stringify(player));
    childPrice.style.color = Number(childPrice.textContent) <= player.money ? 'green' : 'red';
    cafChildPrice.style.color = Number(cafChildPrice.textContent) <= player.money ? 'green' : 'red';
    momChildPrice.style.color = Number(momChildPrice.textContent) <= player.money ? 'green' : 'red';
    gmoChildPrice.style.color = Number(gmoChildPrice.textContent) <= player.money ? 'green' : 'red';
};
setInterval(workerIncome, 1000);
const handleChildClick = (priceIncrease, startPrice, powerIncrease, childType) => {
    let price = priceIncrease * player[childType] + startPrice;
    if (price <= player.money) {
        player.money -= price;
        player[childType] += 1;
        player.workPower += powerIncrease;
    }
    localStorage.setItem('player', JSON.stringify(player));
    updateCounters();
};
child.addEventListener('click', () => {
    handleChildClick(100, 70, 1, 'childCount');
});
cafChild.addEventListener('click', () => {
    handleChildClick(2000, 1000, 10, 'cafChildCount');
});
momChild.addEventListener('click', () => {
    handleChildClick(1500, 700, 6, 'momChildCount');
});
gmoChild.addEventListener('click', () => {
    handleChildClick(1500, 700, 6, 'gmoChildCount');
});
//# sourceMappingURL=script.js.map