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
        baseCost: 50,
        costIncrement: 10,
        productionRate:0.1
    },
    lemonadeStand: {
        count: 0,
        baseCost: 500,
        costIncrement: 50,
        productionRate: 1
    },
    retailStore: {
        count: 0,
        baseCost: 3000,
        costIncrement: 300,
        productionRate: 10
    },
    organicFarm: {
        count: 0,
        baseCost: 10000,
        costIncrement: 700,
        productionRate: 15
    },
    expensiveRestaurant:{
        count: 0,
        baseCost: 15000,
        costIncrement:  1000,
        productionRate: 30
    },
    themePark:{
        count: 0,
        baseCost: 75000,
        costIncrement: 5000,
        productionRate: 60
    },
    goldMine:{
        count: 0,
        baseCost: 400000,
        costIncrement: 20000,
        productionRate: 120
    },
    robotFactory:{
        count: 0,
        baseCost: 2000000,
        costIncrement:  100000,
        productionRate: 300
    },
    banks:{
        count: 0,
        baseCost: 10000000,
        costIncrement:  500000,
        productionRate: 1500
    },
    casinoResort:{
        count: 0,
        baseCost: 50000000,
        costIncrement: 2500000,
        productionRate: 7500
    },
    aiCity:{
        count: 0,
        baseCost: 250000000,
        costIncrement: 12500000,
        productionRate: 15000
    },
    virtualNationState:{
        count: 0,
        baseCost: 1250000000,
        costIncrement: 60000000,
        productionRate: 30000
    },
    spaceStation:{
        count: 0,
        baseCost: 6000000000,
        costIncrement: 300000000,
        productionRate: 60000
    },
    dreamMachine:{
        count: 0,
        baseCost:  30000000000,
        costIncrement: 1500000000,
        productionRate:  120000
    },
    quantumComputerCenter:{
        count: 0,
        baseCost: 150000000000,
        costIncrement: 7500000000,
        productionRate: 240000
    },
    mindControlTower:{
        count: 0,
        baseCost: 750000000000,
        costIncrement:  37500000000,
        productionRate: 480000
    },
    artificialPlanet:{
        count: 0,
        baseCost: 4000000000000,
        costIncrement: 200000000000,
        productionRate: 960000
    },
    spaceColony:{
        count: 0,
        baseCost: 20000000000000,
        costIncrement: 1000000000000,
        productionRate: 1920000
    },
    timeTravelAgency:{
        count: 0,
        baseCost:  100000000000000,
        costIncrement: 5000000000000,
        productionRate:  3840000
    },
    dimensionGate:{
        count: 0,
        baseCost: 500000000000000,
        costIncrement: 25000000000000,
        productionRate: 7680000
    },
    cheetah:{
        count: 0,
        baseCost: 2500000000000000,
        costIncrement:  125000000000000,
        productionRate:  15360000
    },
};

let stockPrice = 100; // 株の初期価格
let playerStocks = 0; // プレイヤーが持っている株の数

const stockPricePatterns = {
    rising: { chance: 20, change: () => Math.floor(Math.random() * 10 + 5) },
    falling: { chance: 20, change: () => -Math.floor(Math.random() * 10 + 5) },
    volatile: { chance: 25, change: () => Math.floor(Math.random() * 20) - 10 },
    stable: { chance: 25, change: () => Math.floor(Math.random() * 5) - 2 },
    crash: { chance: 5, change: () => -Math.floor(Math.random() * 30 + 20) }, // 新しいパターン: 大暴落
    surge: { chance: 5, change: () => Math.floor(Math.random() * 30 + 20) } // 新しいパターン: 大暴騰
};


let currentPattern = "stable";


// 季節ごとの株価変動幅
const stockPriceFluctuation = {
    "春": 5,
    "夏": 10,
    "秋": 15,
    "冬": 20
};

function updateStockPrice() {
    let pattern = stockPricePatterns[currentPattern];
    let change = pattern.change();

    stockPrice += change;
    stockPrice = Math.max(1, stockPrice);

    gameLog.push(`株価が更新されました: ${stockPrice}`);
    displayLog();
    document.getElementById("currentStockPrice").textContent = stockPrice;

    if (Math.random() * 100 < pattern.chance) {
        currentPattern = selectNewPattern();
    }
}

function selectNewPattern() {
    let totalChance = 0;
    let patterns = Object.keys(stockPricePatterns);
    let randomValue = Math.random() * 100;

    for (let i = 0; i < patterns.length; i++) {
        totalChance += stockPricePatterns[patterns[i]].chance;
        if (randomValue <= totalChance) {
            return patterns[i];
        }
    }

    return "stable"; // デフォルトパターン
}



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

if (previousSeason !== currentSeason) {
    playerStocks = 0;
    gameLog.push(`新しい季節になりました。株券が無効になりました。`);
    displayLog();

    // 株券の表示を更新
    document.getElementById("playerStocks").textContent = playerStocks;
}

    changeWeather();  // 季節が変わるたびに天気も変える
}

function buyStocks() {
    let amountToBuy = parseInt(document.getElementById("stockAmount").value);
    let totalCost = amountToBuy * stockPrice;

    if (amountToBuy > 0 && money >= totalCost) {
        money -= totalCost;
        playerStocks += amountToBuy;
        gameLog.push(`${amountToBuy} 株を購入しました。`);
        displayLog();

        // お金と株券の表示を更新
        document.getElementById("money").textContent = money;
        document.getElementById("playerStocks").textContent = playerStocks;
    } else {
        alert("購入できる株の数が不足しているか、お金が足りません。");
    }
}

function sellStocks() {
    let amountToSell = parseInt(document.getElementById("sellStockAmount").value);

    if (amountToSell > 0 && playerStocks >= amountToSell) {
        playerStocks -= amountToSell;
        let totalEarnings = amountToSell * stockPrice;
        money += totalEarnings;
        gameLog.push(`${amountToSell} 株を売却しました。`);
        displayLog();

        // お金と株券の表示を更新
        document.getElementById("money").textContent = money;
        document.getElementById("playerStocks").textContent = playerStocks;
    } else {
        alert("売却できる株の数が不足しているか、保有している株が足りません。");
    }
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

setInterval(updateStockPrice, 5 * 60 * 1000); // 5分ごとに株価を更新

// 例: 10分ごとに季節を変更
setInterval(changeSeason, 30 * 60 * 1000);

// 例: 1分ごとに天気を変更
setInterval(changeWeather, 3 * 60 * 1000);


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

    if (amount >= 1e68) {
        unit = "無量大数";
        displayAmount = amount / 1e68;
    } else if (amount >= 1e64) {
        unit = "不可思議";
        displayAmount = amount / 1e64;
    } else if (amount >= 1e60) {
        unit = "那由他";
        displayAmount = amount / 1e60;
    } else if (amount >= 1e56) {
        unit = "阿僧祇";
        displayAmount = amount / 1e56;
    } else if (amount >= 1e52) {
        unit = "恒河沙";
        displayAmount = amount / 1e52;
    } else if (amount >= 1e48) {
        unit = "極";
        displayAmount = amount / 1e48;
    } else if (amount >= 1e44) {
        unit = "載";
        displayAmount = amount / 1e44;
    } else if (amount >= 1e40) {
        unit = "正";
        displayAmount = amount / 1e40;
    } else if (amount >= 1e36) {
        unit = "澗";
        displayAmount = amount / 1e36;
    } else if (amount >= 1e32) {
        unit = "溝";
        displayAmount = amount / 1e32;
    } else if (amount >= 1e28) {
        unit = "穣";
        displayAmount = amount / 1e28;
    } else if (amount >= 1e24) {
        unit = "𥝱";
        displayAmount = amount / 1e24;
    } else if (amount >= 1e20) {
        unit = "垓";
        displayAmount = amount / 1e20;
    } else if (amount >= 1e16) {
        unit = "京";
        displayAmount = amount / 1e16;
    } else if (amount >= 1e12) {
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



const maxLogSize = 100;  // ログの最大サイズを設定

function addMessageToLog(message) {
    gameLog.push(message);

    // ログのサイズが最大サイズを超えた場合、最も古いメッセージを削除
    if (gameLog.length > maxLogSize) {
        gameLog.shift();  // 配列の最初の要素を削除
    }

    displayLog();  // ログを即座に更新
}





const upgrades = {
    clickBoost: {
        level: 0,
        maxLevel: 15,  // 最大レベルを設定
        baseCost: 50000,
        costIncrement: 20,
        baseBoostAmount: 0.1  // 初期のboostAmountを設定
    },
    clickerBiteBoost: {
        level: 0,
        maxLevel: 15,  // 最大レベルを設定
        baseCost: 50000,
        costIncrement: 20,
        baseBoostAmount: 0.1  // 初期のboostAmountを設定
    },
    // 他のアップグレードもここに追加できます。
    lemonadeStandBoost: {
        level: 0,
        maxLevel: 15,
        baseCost: 50000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    retailStoreBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 50000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    organicFarmBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 50000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    expensiveRestaurantBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 50000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    themeParkBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    goldMineBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    robotFactoryBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    banksBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    casinoResortBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 100000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    aiCityBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 500000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    virtualNationStateBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 500000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    spaceStationBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 500000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    dreamMachineBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 500000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    quantumComputerCenterBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    mindControlTowerBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    artificialPlanetBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    spaceColonyBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    timeTravelAgencyBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 1000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    dimensionGateBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 50000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    cheetahBoost:{
        level: 0,
        maxLevel: 15,
        baseCost: 50000000,  // 任意の初期コスト
        costIncrement: 20,
        baseBoostAmount: 0.1  // 10%の生産増加を示す
    },
    overallProductionBoost: {
        level: 0,
        maxLevel: 10,  // 任意の最大レベルを設定
        baseCost: 10000000,  // 任意の初期コスト
        costIncrement: 25,
        baseBoostAmount: 0.05  // 5%の生産増加を示す
    }
};


function buyUpgrade(type) {
    const upgrade = upgrades[type];
    const currentCost = upgrade.baseCost * Math.pow(3, upgrade.level);  // 10倍ずつ増えるように変更

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
setInterval(updatePriceIndex, 5 * 60 * 1000);




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

document.getElementById("clickBoostCost").innerText = formatMoney(currentCost);
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

// オーガニック農園強化の情報を更新
const organicFarmUpgrade = upgrades.organicFarmBoost;
const organicFarmCurrentCost = organicFarmUpgrade.baseCost + organicFarmUpgrade.costIncrement * organicFarmUpgrade.level;

document.getElementById("organicFarmBoostCost").innerText = formatMoney(organicFarmCurrentCost);
document.getElementById("organicFarmBoostLevel").innerText = organicFarmUpgrade.level;



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



const maxSaves = 5; // 保持する最大セーブデータ数

function saveGame() {
    const gameState = {
        money: money,
        moneyPerClick: moneyPerClick,
        moneyPerSecond: moneyPerSecond,
        buildings: buildings
    };

    // 既存のセーブデータを取得
    const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    savedGames.unshift(gameState); // 新しいセーブデータを先頭に追加

    // セーブデータが最大数を超えていたら、古いものを削除
    while (savedGames.length > maxSaves) {
        savedGames.pop();
    }

    localStorage.setItem('savedGames', JSON.stringify(savedGames));
    console.log("Game saved!");
}

function loadGame() {
    const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    if (savedGames.length > 0) {
        const gameState = savedGames[0]; // 最新のセーブデータを取得
        money = gameState.money;
        moneyPerClick = gameState.moneyPerClick;
        moneyPerSecond = gameState.moneyPerSecond;
        buildings = gameState.buildings;
        console.log("Game loaded!");
    } else {
        console.log("No saved game found.");
    }
}


function autoSave() {
    saveGame();
    console.log("Auto-saving game...");
}

// 30秒ごとに自動セーブ
setInterval(autoSave, 30000); // 30000ミリ秒（30秒）で設定


window.onload = function() {
    loadGame();
    console.log("Game loaded on page load.");
};



