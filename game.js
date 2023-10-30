// プレイヤーが持っているお金の合計
let money = 0;

// 丸をクリックするたびにプレイヤーが得られるお金の量
let moneyPerClick = 1;

// 1秒ごとに自動的に得られるお金の量
let moneyPerSecond = 0;

let productionPerSecond = 0;

let maxProduction = 0;

let totalProduction = 0;


// ゲーム内で利用可能な建物やお店の情報を格納するオブジェクト
let buildings = {
    clickerBite: {
        count: 0,
        baseCost: 15,
        costIncrement: 5,
        productionRate: 0.1
    },
    lemonadeStand: {
        count: 0,
        baseCost: 100,
        costIncrement: 25,
        productionRate: 1
    },
    retailStore: {
        count: 0,
        baseCost: 1100,
        costIncrement: 125,
        productionRate: 25
    },
    organicFarm: {
        count: 0,
        baseCost: 15000,
        costIncrement: 5000,
        productionRate: 125
    },
    expensiveRestaurant:{
        count: 0,
        baseCost: 100000,
        costIncrement: 30000,
        productionRate: 600
    },
    themePark:{
        count: 0,
        baseCost: 500000,
        costIncrement: 150000,
        productionRate: 3000
    },
    goldMine:{
        count: 0,
        baseCost: 2000000,
        costIncrement: 700000,
        productionRate: 10000
    },
    robotFactory:{
        count: 0,
        baseCost: 10000000,
        costIncrement: 3000000,
        productionRate: 50000
    },
    banks:{
        count: 0,
        baseCost: 50000000,
        costIncrement: 15000000,
        productionRate: 200000
    },
    casinoResort:{
        count: 0,
        baseCost: 250000000,
        costIncrement: 80000000,
        productionRate: 1000000
    },
    aiCity:{
        count: 0,
        baseCost: 1000000000,
        costIncrement: 350000000,
        productionRate: 5000000
    },
    virtualNationState:{
        count: 0,
        baseCost: 4000000000,
        costIncrement: 1400000000,
        productionRate: 20000000
    },
    spaceStation:{
        count: 0,
        baseCost: 15000000000,
        costIncrement: 6000000000,
        productionRate: 80000000
    },
    dreamMachine:{
        count: 0,
        baseCost: 60000000000,
        costIncrement: 25000000000,
        productionRate: 320000000
    },
    quantumComputerCenter:{
        count: 0,
        baseCost: 250000000000,
        costIncrement: 100000000000,
        productionRate: 1300000000
    },
    mindControlTower:{
        count: 0,
        baseCost: 1000000000000,
        costIncrement: 450000000000,
        productionRate: 5500000000
    },
    artificialPlanet:{
        count: 0,
        baseCost: 4000000000000,
        costIncrement: 1700000000000,
        productionRate: 23000000000
    },
    spaceColony:{
        count: 0,
        baseCost: 16000000000000,
        costIncrement: 7000000000000,
        productionRate: 95000000000
    },
    timeTravelAgency:{
        count: 0,
        baseCost: 65000000000000,
        costIncrement: 28000000000000,
        productionRate: 400000000000
    },
    dimensionGate:{
        count: 0,
        baseCost: 250000000000000,
        costIncrement: 110000000000000,
        productionRate: 1700000000000
    },
    cheetah:{
        count: 0,
        baseCost: 1000000000000000,
        costIncrement: 450000000000000,
        productionRate: 7200000000000
    },
};

// ログエントリを保存する配列
let gameLog = [];

const seasons = ['春', '夏', '秋', '冬'];
const weatherBySeason = {
'春': ['晴れ', '曇り', '雨'],
'夏': ['晴れ', '曇り', '雨', '雷'],
'秋': ['晴れ', '曇り', '雨'],
'冬': ['晴れ', '曇り', '雪']
};

let currentSeason = seasons[0];  // 初期の季節を春とする
let currentWeather = weatherBySeason[currentSeason][0];  // 初期の天気を季節に合わせて設定

// 季節を変更する関数
function changeSeason() {
    const previousSeason = currentSeason;
    const currentIndex = seasons.indexOf(currentSeason);
    currentSeason = seasons[(currentIndex + 1) % seasons.length];

    // 季節を変更する関数の中で...
if (previousSeason !== currentSeason) {
    gameLog.push(`季節が ${previousSeason} から ${currentSeason} に変わりました。`);
    displayLog();  // ログを即座に更新
    document.getElementById("currentSeason").textContent = currentSeason;  // 現在の季節を更新
}

    changeWeather();  // 季節が変わるたびに天気も変える
}


// ログを表示する関数
function displayLog() {
    const logElement = document.getElementById("gameLog");
    logElement.innerHTML = gameLog.join('<br>');
}

// 天気を変更する関数
function changeWeather() {
    const previousWeather = currentWeather;
    const availableWeathers = weatherBySeason[currentSeason];
    const randomIndex = Math.floor(Math.random() * availableWeathers.length);
    currentWeather = availableWeathers[randomIndex];

    // 天気を変更する関数の中で...
if (previousWeather !== currentWeather) {
    gameLog.push(`天気が ${previousWeather} から ${currentWeather} に変わりました。`);
    displayLog();  // ログを即座に更新
    document.getElementById("currentWeather").textContent = currentWeather;  // 現在の天気を更新
}
}

// 例: 10分ごとに季節を変更
setInterval(changeSeason, 10 * 60 * 1000);

// 例: 1分ごとに天気を変更
setInterval(changeWeather, 1 * 60 * 1000);


function adjustFacilityProfitByWeather(facilityKey, facility) {
    // レモネードスタンドに関する天気の影響
    if (facilityKey === 'lemonadeStand') {
        if (currentWeather === '雨') {
            return facility.productionRate * 0.5;  // 雨の日は収益が半分に
        } else if (currentWeather === '晴れ') {
            return facility.productionRate * 1.2;  // 晴れの日は収益が20%増
        }
    }
    
    // テーマパークに関する天気の影響
    if (facilityKey === 'themePark') {
        if (currentWeather === '雨') {
            return facility.productionRate * 0.7;  // 雨の日は収益が30%減少
        } else if (currentWeather === '雷') {
            return facility.productionRate * 0.3;  // 雷の日は収益が大幅に減少
        }
    }

    // 他の施設や天気の組み合わせについての条件をこちらに追加

    return facility.productionRate;  // 上記の条件に合致しない場合、デフォルトの収益率を返す
}

function formatMoney(amount) {
    let unit = "";
    let displayAmount = amount;
    
    if (amount >= 1e12) {
        unit = "兆";
        displayAmount = amount / 1e12;
    } else if (amount >= 1e8) {
        unit = "億";
        displayAmount = amount / 1e8;
    } else if (amount >= 1e4) {
        unit = "万";
        displayAmount = amount / 1e4;
    }

    return displayAmount.toFixed(2) + unit;  // 小数点以下2桁まで表示
}







const upgrades = {
    clickBoost: {
        level: 0,
        maxLevel: 15,  // 最大レベルを設定
        baseCost: 50000,
        costIncrement: 20,
        baseBoostAmount: 1  // 初期のboostAmountを設定
    },
    clickerBiteBoost: {
        level: 0,
        maxLevel: 15,  // 最大レベルを設定
        baseCost: 50000,
        costIncrement: 20,
        baseBoostAmount: 1  // 初期のboostAmountを設定
    },
    // 他のアップグレードもここに追加できます。
    lemonadeStandBoost: {
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    retailStoreBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    organicFarmBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    expensiveRestaurantBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    themeParkBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    goldMineBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    robotFactoryBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    banksBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    casinoResortBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    aiCityBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    virtualNationStateBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    spaceStationBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    dreamMachineBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    quantumComputerCenterBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    mindControlTowerBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    artificialPlanetBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    spaceColonyBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    timeTravelAgencyBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    dimensionGateBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    cheetahBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    overallProductionBoost: {
        level: 0,
        maxLevel: 10,  // 任意の最大レベルを設定
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 25,
        baseBoostAmount: 0.05  // 5%の生産増加を示す
    }
};


function buyUpgrade(type) {
    const upgrade = upgrades[type];
    const currentCost = upgrade.baseCost * Math.pow(10, upgrade.level);  // 10倍ずつ増えるように変更

    if (upgrade.level >= upgrade.maxLevel) {
        alert("最大レベルに達しました！");
        return;
    }

    if (money >= currentCost) {
        money -= currentCost;
        upgrade.level++;
        
        if (type === 'clickBoost') {
            upgrade.boostAmount = upgrade.baseBoostAmount * Math.pow(2, upgrade.level - 1);  // 効率が2倍になる
            moneyPerClick += upgrade.boostAmount;
        }
        
        if (type === 'lemonadeStandBoost') {
            // レモネードスタンドの生産率を増加させる
            const boostAmount = buildings.lemonadeStand.productionRate * upgrade.baseBoostAmount;
            buildings.lemonadeStand.productionRate += boostAmount;
        }
        
        if (type === 'overallProductionBoost') {
            // 全体の生産率を増加させる
            const boostAmount = upgrade.baseBoostAmount * (upgrade.level + 1);  // 現在のレベルに基づく増加量を計算
            for (let buildingType in buildings) {
                buildings[buildingType].productionRate *= (1 + boostAmount);
            }
        }
        // 他のアップグレードタイプに対する処理もここで実装できます。
        
        updateUI();
    } else {
        alert("お金が足りません！");
    }
}






function clickCircle() {
    money += moneyPerClick;

    // 総生産量にもクリックで得られるお金の量を加算
    totalProduction += moneyPerClick;

    // 最大生産数を更新
    if (money > maxProduction) {
        maxProduction = money;
    }

}







// 指定されたお店の現在のコストを計算する関数
function getBuildingCost(type) {
    const building = buildings[type];
    // 物価指数で建物のコストを調整
    return (building.baseCost + building.costIncrement * building.count) * priceIndex;
}

// お店を購入するための関数
function buyBuilding(type) {
    const building = buildings[type];
    const currentCost = getBuildingCost(type);

    if (money >= currentCost) {
        money -= currentCost;
        building.count++;
        // 物価指数で生産率を調整
        if (priceIndex > 1) { // 好景気の場合
            moneyPerSecond += building.productionRate * priceIndex;
        } else { // 不景気の場合
            moneyPerSecond += building.productionRate / priceIndex;
        }
        updateUI();
    } else {
        alert("お金が足りません！");
    }
}

// お店を売るための関数
function sellBuilding(type) {
    const building = buildings[type];

    if (building.count > 0) {
        // 売却価格を計算（現在の購入価格の50%）
        const sellPrice = getBuildingCost(type) * 0.5;
        money += sellPrice;
        building.count--;
        // 物価指数で生産率を調整
        if (priceIndex > 1) { // 好景気の場合
            moneyPerSecond -= building.productionRate * priceIndex;
        } else { // 不景気の場合
            moneyPerSecond -= building.productionRate / priceIndex;
        }
        updateUI();
    } else {
        alert("売却するお店がありません！");
    }
}


let priceIndex = 1.0;  // 初期の物価指数

// 物価指数の変動ロジック
function updatePriceIndex() {
    const fluctuationRate = 0.05 + Math.random() * 0.10; // 5% から 15% の範囲でランダムに変動率を決定

    // 50% の確率で好況または不況を選択
    const isBoom = Math.random() > 0.5;

    let message = "";

    if (isBoom) {
        // 好況の場合、物価指数を増加させる
        priceIndex *= (1 + fluctuationRate);
        message = "経済の好況！物価指数が " + priceIndex.toFixed(2) + " に増加しました。";
    } else {
        // 不況の場合、物価指数を減少させる
        priceIndex *= (1 - fluctuationRate);
        message = "経済の不況！物価指数が " + priceIndex.toFixed(2) + " に減少しました。";
    }

    // ログにメッセージを追加
    gameLog.push(message);
    displayLog();  // ログを即座に更新
}
// 1分ごとに物価指数を更新
setInterval(updatePriceIndex, 60 * 1000);




setInterval(function() {
    money += moneyPerSecond * 0.1;
    totalProduction += moneyPerSecond * 0.1;
    updateUI();
}, 100);


// 画面上の情報を更新する関数
function updateUI() {
    document.getElementById("money").innerText = formatMoney(money) + "円";

    document.getElementById('currentSeason').innerText = currentSeason;
    document.getElementById('currentWeather').innerText = currentWeather;

      // 生産量の更新
      productionPerSecond = moneyPerSecond;  // 1秒あたりの生産量はmoneyPerSecondと同じ

        if (money > maxProduction) {
          maxProduction = money;  // これまでの最高額を更新
        }

    document.getElementById('productionPerSecond').textContent = formatMoney(productionPerSecond);
    document.getElementById('maxProduction').textContent = formatMoney(maxProduction);
    document.getElementById('totalProduction').textContent = formatMoney(totalProduction);

 // 先ほどのformatMoney関数を用いて数値をフォーマットする
document.getElementById("clickerBiteCount").innerText = formatMoney(buildings.clickerBite.count);
document.getElementById("clickerBiteCost").innerText = formatMoney(getBuildingCost('clickerBite'));
document.getElementById("clickerBiteSellPrice").innerText = formatMoney(getBuildingCost('clickerBite') * 0.5 * priceIndex);

 // 以下、同様に他のビルディングやアップグレードの数値もフォーマットする
document.getElementById("lemonadeStandCount").innerText = formatMoney(buildings.lemonadeStand.count);
document.getElementById("lemonadeStandCost").innerText = formatMoney(getBuildingCost('lemonadeStand'));
document.getElementById("lemonadeStandSellPrice").innerText = formatMoney(getBuildingCost('lemonadeStand') * 0.5 * priceIndex);;


// retailStoreの情報を更新
document.getElementById("retailStoreCount").innerText = formatMoney(buildings.retailStore.count);
document.getElementById("retailStoreCost").innerText = formatMoney(getBuildingCost('retailStore'));
document.getElementById("retailStoreSellPrice").innerText = formatMoney(getBuildingCost('retailStore') * 0.5 * priceIndex);

// organicFarmの情報を更新
document.getElementById("organicFarmCount").innerText = formatMoney(buildings.organicFarm.count);
document.getElementById("organicFarmCost").innerText = formatMoney(getBuildingCost('organicFarm'));
document.getElementById("organicFarmSellPrice").innerText = formatMoney(getBuildingCost('organicFarm') * 0.5 * priceIndex);

// expensiveRestaurantの情報を更新
document.getElementById("expensiveRestaurantCount").innerText = formatMoney(buildings.expensiveRestaurant.count);
document.getElementById("expensiveRestaurantCost").innerText = formatMoney(getBuildingCost('expensiveRestaurant'));
document.getElementById("expensiveRestaurantSellPrice").innerText = formatMoney(getBuildingCost('expensiveRestaurant') * 0.5 * priceIndex);

// themeParkの情報を更新
document.getElementById("themeParkCount").innerText = formatMoney(buildings.themePark.count);
document.getElementById("themeParkCost").innerText = formatMoney(getBuildingCost('themePark'));
document.getElementById("themeParkSellPrice").innerText = formatMoney(getBuildingCost('themePark') * 0.5 * priceIndex);

// goldMineの情報を更新
document.getElementById("goldMineCount").innerText = formatMoney(buildings.goldMine.count);
document.getElementById("goldMineCost").innerText = formatMoney(getBuildingCost('goldMine'));
document.getElementById("goldMineSellPrice").innerText = formatMoney(getBuildingCost('goldMine') * 0.5 * priceIndex);

// robotFactoryの情報を更新
document.getElementById("robotFactoryCount").innerText = formatMoney(buildings.robotFactory.count);
document.getElementById("robotFactoryCost").innerText = formatMoney(getBuildingCost('robotFactory'));
document.getElementById("robotFactorySellPrice").innerText = formatMoney(getBuildingCost('robotFactory') * 0.5 * priceIndex);

// banksの情報を更新
document.getElementById("banksCount").innerText = formatMoney(buildings.banks.count);
document.getElementById("banksCost").innerText = formatMoney(getBuildingCost('banks'));
document.getElementById("banksSellPrice").innerText = formatMoney(getBuildingCost('banks') * 0.5 * priceIndex);

// casinoResortの情報を更新
document.getElementById("casinoResortCount").innerText = formatMoney(buildings.casinoResort.count);
document.getElementById("casinoResortCost").innerText = formatMoney(getBuildingCost('casinoResort'));
document.getElementById("casinoResortSellPrice").innerText = formatMoney(getBuildingCost('casinoResort') * 0.5 * priceIndex);

// aiCityの情報を更新
document.getElementById("aiCityCount").innerText = formatMoney(buildings.aiCity.count);
document.getElementById("aiCityCost").innerText = formatMoney(getBuildingCost('aiCity'));
document.getElementById("aiCitySellPrice").innerText = formatMoney(getBuildingCost('aiCity') * 0.5 * priceIndex);


// virtualNationStateの情報を更新
document.getElementById("virtualNationStateCount").innerText = formatMoney(buildings.virtualNationState.count);
document.getElementById("virtualNationStateCost").innerText = formatMoney(getBuildingCost('virtualNationState'));
document.getElementById("virtualNationStateSellPrice").innerText = formatMoney(getBuildingCost('virtualNationState') * 0.5 * priceIndex);

// spaceStationの情報を更新
document.getElementById("spaceStationCount").innerText = formatMoney(buildings.spaceStation.count);
document.getElementById("spaceStationCost").innerText = formatMoney(getBuildingCost('spaceStation'));
document.getElementById("spaceStationSellPrice").innerText = formatMoney(getBuildingCost('spaceStation') * 0.5 * priceIndex);

// dreamMachineの情報を更新
document.getElementById("dreamMachineCount").innerText = formatMoney(buildings.dreamMachine.count);
document.getElementById("dreamMachineCost").innerText = formatMoney(getBuildingCost('dreamMachine'));
document.getElementById("dreamMachineSellPrice").innerText = formatMoney(getBuildingCost('dreamMachine') * 0.5 * priceIndex);


// quantumComputerCenterの情報を更新
document.getElementById("quantumComputerCenterCount").innerText = formatMoney(buildings.quantumComputerCenter.count);
document.getElementById("quantumComputerCenterCost").innerText = formatMoney(getBuildingCost('quantumComputerCenter'));
document.getElementById("quantumComputerCenterSellPrice").innerText = formatMoney(getBuildingCost('quantumComputerCenter') * 0.5 * priceIndex);


// mindControlTowerの情報を更新
document.getElementById("mindControlTowerCount").innerText = formatMoney(buildings.mindControlTower.count);
document.getElementById("mindControlTowerCost").innerText = formatMoney(getBuildingCost('mindControlTower'));
document.getElementById("mindControlTowerSellPrice").innerText = formatMoney(getBuildingCost('mindControlTower') * 0.5 * priceIndex);

// artificialPlanetの情報を更新
document.getElementById("artificialPlanetCount").innerText = formatMoney(buildings.artificialPlanet.count);
document.getElementById("artificialPlanetCost").innerText = formatMoney(getBuildingCost('artificialPlanet'));
document.getElementById("artificialPlanetSellPrice").innerText = formatMoney(getBuildingCost('artificialPlanet') * 0.5 * priceIndex);

// spaceColonyの情報を更新
document.getElementById("spaceColonyCount").innerText = formatMoney(buildings.spaceColony.count);
document.getElementById("spaceColonyCost").innerText = formatMoney(getBuildingCost('spaceColony'));
document.getElementById("spaceColonySellPrice").innerText = formatMoney(getBuildingCost('spaceColony') * 0.5 * priceIndex);


// timeTravelAgencyの情報を更新
document.getElementById("timeTravelAgencyCount").innerText = formatMoney(buildings.timeTravelAgency.count);
document.getElementById("timeTravelAgencyCost").innerText = formatMoney(getBuildingCost('timeTravelAgency'));
document.getElementById("timeTravelAgencySellPrice").innerText = formatMoney(getBuildingCost('timeTravelAgency') * 0.5 * priceIndex);


// dimensionGateの情報を更新
document.getElementById("dimensionGateCount").innerText = formatMoney(buildings.dimensionGate.count);
document.getElementById("dimensionGateCost").innerText = formatMoney(getBuildingCost('dimensionGate'));
document.getElementById("dimensionGateSellPrice").innerText = formatMoney(getBuildingCost('dimensionGate') * 0.5 * priceIndex);

// cheetahの情報を更新
document.getElementById("cheetahCount").innerText = formatMoney(buildings.cheetah.count);
document.getElementById("cheetahCost").innerText = formatMoney(getBuildingCost('cheetah'));
document.getElementById("cheetahSellPrice").innerText = formatMoney(getBuildingCost('cheetah') * 0.5 * priceIndex);

  // クリック強化の情報を更新
const clickBoostUpgrade = upgrades.clickBoost;
const currentCost = clickBoostUpgrade.baseCost + clickBoostUpgrade.costIncrement * clickBoostUpgrade.level;

document.getElementById("clickBoostCost").innerText = currentCost;
document.getElementById("clickBoostLevel").innerText = clickBoostUpgrade.level;

// クリッカーバイト強化の情報を更新
const clickerBiteUpgrade = upgrades.clickerBiteBoost;
const clickerBiteCurrentCost = clickerBiteUpgrade.baseCost + clickerBiteUpgrade.costIncrement * clickerBiteUpgrade.level;

document.getElementById("clickerBiteBoostCost").innerText = formatMoney(clickerBiteCurrentCost);
document.getElementById("clickerBiteBoostLevel").innerText = clickerBiteUpgrade.level;


// レモネードスタンド強化の情報を更新
const lemonadeStandUpgrade = upgrades.lemonadeStandBoost;
const lemonadeStandCurrentCost = lemonadeStandUpgrade.baseCost + lemonadeStandUpgrade.costIncrement * lemonadeStandUpgrade.level;

document.getElementById("lemonadeStandBoostCost").innerText = formatMoney(lemonadeStandCurrentCost);
document.getElementById("lemonadeStandBoostLevel").innerText = lemonadeStandUpgrade.level;


// リテールストア強化の情報を更新
const retailStoreUpgrade = upgrades.retailStoreBoost;
const retailStoreCurrentCost = retailStoreUpgrade.baseCost + retailStoreUpgrade.costIncrement * retailStoreUpgrade.level;

document.getElementById("retailStoreBoostCost").innerText = formatMoney(retailStoreCurrentCost);
document.getElementById("retailStoreBoostLevel").innerText = retailStoreUpgrade.level;


// 高級レストラン強化の情報を更新
const expensiveRestaurantUpgrade = upgrades.expensiveRestaurantBoost;
const expensiveRestaurantCurrentCost = expensiveRestaurantUpgrade.baseCost + expensiveRestaurantUpgrade.costIncrement * expensiveRestaurantUpgrade.level;

document.getElementById("expensiveRestaurantBoostCost").innerText = formatMoney(expensiveRestaurantCurrentCost);
document.getElementById("expensiveRestaurantBoostLevel").innerText = expensiveRestaurantUpgrade.level;

// テーマパーク強化の情報を更新
const themeParkUpgrade = upgrades.themeParkBoost;
const themeParkCurrentCost = themeParkUpgrade.baseCost + themeParkUpgrade.costIncrement * themeParkUpgrade.level;

document.getElementById("themeParkBoostCost").innerText = formatMoney(themeParkCurrentCost);
document.getElementById("themeParkBoostLevel").innerText = themeParkUpgrade.level;

// 金鉱強化の情報を更新
const goldMineUpgrade = upgrades.goldMineBoost;
const goldMineCurrentCost = goldMineUpgrade.baseCost + goldMineUpgrade.costIncrement * goldMineUpgrade.level;

document.getElementById("goldMineBoostCost").innerText = formatMoney(goldMineCurrentCost);
document.getElementById("goldMineBoostLevel").innerText = goldMineUpgrade.level;

// ロボット工場強化の情報を更新
const robotFactoryUpgrade = upgrades.robotFactoryBoost;
const robotFactoryCurrentCost = robotFactoryUpgrade.baseCost + robotFactoryUpgrade.costIncrement * robotFactoryUpgrade.level;

document.getElementById("robotFactoryBoostCost").innerText = formatMoney(robotFactoryCurrentCost);
document.getElementById("robotFactoryBoostLevel").innerText = robotFactoryUpgrade.level

// 銀行強化の情報を更新
const banksUpgrade = upgrades.banksBoost;
const banksCurrentCost = banksUpgrade.baseCost + banksUpgrade.costIncrement * banksUpgrade.level;

document.getElementById("banksBoostCost").innerText = formatMoney(banksCurrentCost);
document.getElementById("banksBoostLevel").innerText = banksUpgrade.level;

// カジノリゾート強化の情報を更新
const casinoResortUpgrade = upgrades.casinoResortBoost;
const casinoResortCurrentCost = casinoResortUpgrade.baseCost + casinoResortUpgrade.costIncrement * casinoResortUpgrade.level;

document.getElementById("casinoResortBoostCost").innerText = formatMoney(casinoResortCurrentCost);
document.getElementById("casinoResortBoostLevel").innerText = casinoResortUpgrade.level;

// AI都市強化の情報を更新
const aiCityUpgrade = upgrades.aiCityBoost;
const aiCityCurrentCost = aiCityUpgrade.baseCost + aiCityUpgrade.costIncrement * aiCityUpgrade.level;

document.getElementById("aiCityBoostCost").innerText = formatMoney(aiCityCurrentCost);
document.getElementById("aiCityBoostLevel").innerText = aiCityUpgrade.level;

// 仮想国家強化の情報を更新
const virtualNationStateUpgrade = upgrades.virtualNationStateBoost;
const virtualNationStateCurrentCost = virtualNationStateUpgrade.baseCost + virtualNationStateUpgrade.costIncrement * virtualNationStateUpgrade.level;

document.getElementById("virtualNationStateBoostCost").innerText = formatMoney(virtualNationStateCurrentCost);
document.getElementById("virtualNationStateBoostLevel").innerText = virtualNationStateUpgrade.level;

// 宇宙ステーション強化の情報を更新
const spaceStationUpgrade = upgrades.spaceStationBoost;
const spaceStationCurrentCost = spaceStationUpgrade.baseCost + spaceStationUpgrade.costIncrement * spaceStationUpgrade.level;

document.getElementById("spaceStationBoostCost").innerText = formatMoney(spaceStationCurrentCost);
document.getElementById("spaceStationBoostLevel").innerText = spaceStationUpgrade.level;

// ドリームマシン強化の情報を更新
const dreamMachineUpgrade = upgrades.dreamMachineBoost;
const dreamMachineCurrentCost = dreamMachineUpgrade.baseCost + dreamMachineUpgrade.costIncrement * dreamMachineUpgrade.level;

document.getElementById("dreamMachineBoostCost").innerText = formatMoney(dreamMachineCurrentCost);
document.getElementById("dreamMachineBoostLevel").innerText = dreamMachineUpgrade.level;

// 量子コンピューターセンター強化の情報を更新
const quantumComputerCenterUpgrade = upgrades.quantumComputerCenterBoost;
const quantumComputerCenterCurrentCost = quantumComputerCenterUpgrade.baseCost + quantumComputerCenterUpgrade.costIncrement * quantumComputerCenterUpgrade.level;

document.getElementById("quantumComputerCenterBoostCost").innerText = formatMoney(quantumComputerCenterCurrentCost);
document.getElementById("quantumComputerCenterBoostLevel").innerText = quantumComputerCenterUpgrade.level;

// マインドコントロールタワー強化の情報を更新
const mindControlTowerUpgrade = upgrades.mindControlTowerBoost;
const mindControlTowerCurrentCost = mindControlTowerUpgrade.baseCost + mindControlTowerUpgrade.costIncrement * mindControlTowerUpgrade.level;

document.getElementById("mindControlTowerBoostCost").innerText = formatMoney(mindControlTowerCurrentCost);
document.getElementById("mindControlTowerBoostLevel").innerText = mindControlTowerUpgrade.level;

// 人工惑星強化の情報を更新
const artificialPlanetUpgrade = upgrades.artificialPlanetBoost;
const artificialPlanetCurrentCost = artificialPlanetUpgrade.baseCost + artificialPlanetUpgrade.costIncrement * artificialPlanetUpgrade.level;

document.getElementById("artificialPlanetBoostCost").innerText = formatMoney(artificialPlanetCurrentCost);
document.getElementById("artificialPlanetBoostLevel").innerText = artificialPlanetUpgrade.level;

// 宇宙植民地強化の情報を更新
const spaceColonyUpgrade = upgrades.spaceColonyBoost;
const spaceColonyCurrentCost = spaceColonyUpgrade.baseCost + spaceColonyUpgrade.costIncrement * spaceColonyUpgrade.level;

document.getElementById("spaceColonyBoostCost").innerText = formatMoney(spaceColonyCurrentCost);
document.getElementById("spaceColonyBoostLevel").innerText = spaceColonyUpgrade.level;

// タイムトラベル代理店強化の情報を更新
const timeTravelAgencyUpgrade = upgrades.timeTravelAgencyBoost;
const timeTravelAgencyCurrentCost = timeTravelAgencyUpgrade.baseCost + timeTravelAgencyUpgrade.costIncrement * timeTravelAgencyUpgrade.level;

document.getElementById("timeTravelAgencyBoostCost").innerText = formatMoney(timeTravelAgencyCurrentCost);
document.getElementById("timeTravelAgencyBoostLevel").innerText = timeTravelAgencyUpgrade.level;

// 次元ゲート強化の情報を更新
const dimensionGateUpgrade = upgrades.dimensionGateBoost;
const dimensionGateCurrentCost = dimensionGateUpgrade.baseCost + dimensionGateUpgrade.costIncrement * dimensionGateUpgrade.level;

document.getElementById("dimensionGateBoostCost").innerText = formatMoney(dimensionGateCurrentCost);
document.getElementById("dimensionGateBoostLevel").innerText = dimensionGateUpgrade.level;

// チーター強化の情報を更新
const cheetahUpgrade = upgrades.cheetahBoost;
const cheetahCurrentCost = cheetahUpgrade.baseCost + cheetahUpgrade.costIncrement * cheetahUpgrade.level;

document.getElementById("cheetahBoostCost").innerText = formatMoney(cheetahCurrentCost);
document.getElementById("cheetahBoostLevel").innerText = cheetahUpgrade.level;




 // 全体の生産アップグレードの情報を更新
const overallUpgrade = upgrades.overallProductionBoost;
const overallBoostCost = overallUpgrade.baseCost * Math.pow(10, overallUpgrade.level);

document.getElementById("overallProductionBoostLevel").textContent = overallUpgrade.level;
document.getElementById("overallProductionBoostCost").textContent = formatMoney(overallBoostCost);
}



function saveGame() {
    const gameState = {
        money: money,
        moneyPerClick: moneyPerClick,
        moneyPerSecond: moneyPerSecond,
        buildings: buildings
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log("Game saved!");
    console.log("Saved buildings:", buildings);
}

function loadGame() {
    const savedData = localStorage.getItem('gameState');
    if (savedData) {
        const gameState = JSON.parse(savedData);
        money = gameState.money;
        moneyPerClick = gameState.moneyPerClick;
        moneyPerSecond = gameState.moneyPerSecond;
        buildings = gameState.buildings;
        console.log("Game loaded!");
        console.log("Loaded buildings:", buildings);
    } else {
        console.log("No saved game found.");
    }
}




