"use strict";
const player = {
    money: 0,
    workPower: 0,
    childCount: 0,
    cafChildCount: 0,
    momChildCount: 0
};
const money = document.getElementById('money-counter');
const hammer = document.getElementById('hammer');
const child = document.getElementById('child');
const childCounter = document.getElementById('child-counter');
const childIncome = document.getElementById('child-income');
const childPrice = document.getElementById('child-price');
const cafChild = document.getElementById('cafChild');
const cafChildCounter = document.getElementById('cafChild-counter');
const cafChildIncome = document.getElementById('cafChild-income');
const cafChildPrice = document.getElementById('cafChild-price');
const momChild = document.getElementById('momChild');
const momChildCounter = document.getElementById('momChild-counter');
const momChildIncome = document.getElementById('momChild-income');
const momChildPrice = document.getElementById('momChild-price');
const savedPlayer = JSON.parse(localStorage.getItem('player'));
if (savedPlayer) {
    Object.assign(player, savedPlayer);
}
function updateCounters() {
    money.textContent = player.money.toString();
    childIncome.textContent = `${player.childCount} cash/s`;
    childCounter.textContent = 'Child X ' + player.childCount.toString();
    childPrice.textContent = `Price: ${100 * player.childCount + 70}`;
    cafChildIncome.textContent = `${player.cafChildCount * 10} cash/s`;
    cafChildCounter.textContent = 'Caffeinated Child x ' + player.cafChildCount.toString();
    cafChildPrice.textContent = `Price: ${2000 * player.cafChildCount + 1000}`;
    momChildIncome.textContent = `${player.momChildCount * 6} cash/s`;
    momChildCounter.textContent = 'Mommy`s Boy x ' + player.momChildCount.toString();
    momChildPrice.textContent = `Price: ${1500 * player.momChildCount + 700}`;
}
updateCounters();
hammer.addEventListener('click', () => {
    player.money += 1;
    localStorage.setItem('player', JSON.stringify(player));
    updateCounters();
});
const workerIncome = () => {
    player.money += player.workPower * 1;
    money.textContent = player.money.toString();
    localStorage.setItem('player', JSON.stringify(player));
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
//# sourceMappingURL=script.js.map