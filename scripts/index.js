'use strict';

const getHistoryCandles = require('./modules/workWithExchange/getDataFromServer/getHistoryCandles');
const getValueCandles = require('./modules/changeArrayAndObj/changeArrayFromServer');
const indicatorMACD = require('./modules/talibIndicators/indicator_MACD');
const checkSignalIndicatorMACD = require('./modules/strategy/checkIndicatorMACD');
const placeOrder = require('./modules/strategy/placeOrder');
const timeInterval = require('./modules/other/timeInterval');
const initData = require('./modules/initData');
const writeLog = require('./modules/other/writeLog');
const sendInTelegram = require('./modules/other/sendInTelegram');

async function mainCycle() {
	console.info(Date());
	try {
		const HistoryCandles = await getHistoryCandles();
		const valueCandles = getValueCandles(HistoryCandles);
		const valuesIndicatorMACD = indicatorMACD(valueCandles.close, initData);
		const signalIndicatorMACD = checkSignalIndicatorMACD(valuesIndicatorMACD);
		placeOrder(signalIndicatorMACD);
	}
	catch (e) {
		console.error(`Error!!!!  \n ${e}`, initData.pair);
		sendInTelegram(`Error!!!! ${initData.pair}`);
		writeLog('log.txt' ,`${Date()} \n	Error!!!! \n ${e} \n`);

		setTimeout(() => {mainCycle();}, 30000);
	}
}

setTimeout(() => {
	mainCycle();
	setInterval(() => {mainCycle();}, timeInterval.timeOneCandleMiliseconds);
}, timeInterval.timeFirstStart);
