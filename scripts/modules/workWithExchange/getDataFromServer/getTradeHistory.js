'use strict';

const binance = require('../connectToExchange');
const initData = require('../../initData');

const getTradeHistory = () => {
	return new Promise(resolve => {
		binance.trades(initData.pair, (error, trades, symbol) => {
			resolve(trades);
			});
	});
};

module.exports = getTradeHistory;