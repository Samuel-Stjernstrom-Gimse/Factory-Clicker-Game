"use strict";
const player = {
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
};
const money = document.getElementById('money-counter');
const childTotalIncome = document.getElementById('child-income-total');
const hammer = document.getElementById('hammer');
const newHammer = document.getElementById('new-hammer');
const child = document.getElementById('child');
const childCounter = document.getElementById('child-counter');
const childIncome = document.getElementById('child-income');
const childPrice = document.getElementById('child-price');
const childPriceIncrease = 60;
const childStartPrice = 70;
const childStartPower = 1;
const cafChild = document.getElementById('cafChild');
const cafChildCounter = document.getElementById('cafChild-counter');
const cafChildIncome = document.getElementById('cafChild-income');
const cafChildPrice = document.getElementById('cafChild-price');
const cafChildPriceIncrease = 2000;
const cafChildStartPrice = 1000;
const cafChildPower = 15;
const momChild = document.getElementById('momChild');
const momChildCounter = document.getElementById('momChild-counter');
const momChildIncome = document.getElementById('momChild-income');
const momChildPrice = document.getElementById('momChild-price');
const momChildPriceIncrease = 1700;
const momChildStartPrice = 200;
const momChildPower = 13;
const gmoChild = document.getElementById('gmoChild');
const gmoChildCounter = document.getElementById('gmoChild-counter');
const gmoChildIncome = document.getElementById('gmoChild-income');
const gmoChildPrice = document.getElementById('gmoChild-price');
const gmoChildPriceIncrease = 3000;
const gmoChildStartPrice = 1500;
const gmoChildPower = 35;
const savedPlayer = JSON.parse(localStorage.getItem('player'));
if (savedPlayer) {
    Object.assign(player, savedPlayer);
}
hammer.src = player.hammerURL;
newHammer.textContent = `Gold Hammer ${player.hammerPrice} $`;
newHammer.addEventListener('click', () => {
    if (player.hammerPrice <= player.money) {
        if (player.hammerCount === 1) {
            player.hammerURL = 'assets/images/hammer2.png';
            player.money -= player.hammerPrice;
            player.hammerCount++;
            hammer.src = player.hammerURL;
            player.hammerPrice = 90000;
            newHammer.textContent = `Mythic Hammer ${player.hammerPrice} $`;
            player.hammerPower = 100;
            localStorage.setItem('player', JSON.stringify(player));
            updateCounters();
        }
        else if (player.hammerCount === 2) {
            player.hammerURL = 'assets/images/hammer3.png';
            player.money -= player.hammerPrice;
            player.hammerCount++;
            hammer.src = player.hammerURL;
            player.hammerPrice = 400000;
            newHammer.textContent = `caffeinated Hammer ${player.hammerPrice} $`;
            player.hammerPower = 450;
            localStorage.setItem('player', JSON.stringify(player));
            updateCounters();
        }
        else if (player.hammerCount === 3) {
            player.hammerURL = 'assets/images/hammer4.png';
            player.money -= player.hammerPrice;
            player.hammerCount++;
            hammer.src = player.hammerURL;
            player.hammerPrice = 0;
            newHammer.textContent = `MAX `;
            player.hammerPower = 5000;
            localStorage.setItem('player', JSON.stringify(player));
            updateCounters();
        }
    }
});
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
    player.money += player.hammerPower;
    localStorage.setItem('player', JSON.stringify(player));
    updateCounters();
});
const workerIncome = () => {
    player.money += player.workPower;
    money.textContent = player.money.toString();
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
    handleChildClick(childPriceIncrease, childStartPrice, childStartPower, 'childCount');
});
cafChild.addEventListener('click', () => {
    handleChildClick(cafChildPriceIncrease, cafChildStartPrice, cafChildPower, 'cafChildCount');
});
momChild.addEventListener('click', () => {
    handleChildClick(momChildPriceIncrease, momChildStartPrice, momChildPower, 'momChildCount');
});
gmoChild.addEventListener('click', () => {
    handleChildClick(gmoChildPriceIncrease, gmoChildStartPrice, gmoChildPower, 'gmoChildCount');
});
//# sourceMappingURL=script.js.map