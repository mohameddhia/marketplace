const express = require('express')

const Web3 = require('web3');
const app = express();
let marketplace = require('./utils/marketplace');
const { ethers, Wallet } = require("ethers");
const game = require('./utils/game');
const nftoken = require('./utils/nft')
const eytoken = require('./utils/eytoken')
const marketplaceAddress = process.env.MarketPlace;
const gameAddress = process.env.Game;
const nftAddress = process.env.NFT;
const tokenAddress = process.env.EYTOKEN;
app.use(express.json())

app.get('/CreateWallet', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const rpcId = "";
	const rpcMumbai = process.env.RINKEBY_URI;
	const providerMumbai = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/");

	const pureWallet = ethers.Wallet.createRandom();
	console.log(pureWallet._mnemonic().phrase);
	console.log(pureWallet._signingKey());
	console.log({ pureWallet });

	const wallet = new Wallet(pureWallet, providerMumbai);
	res.end(JSON.stringify(wallet));
})



app.post('/createMarketItem', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;
	const nftContract = req.body.nftContract;
	const tokenId = req.body.tokenId;
	const price = req.body.price;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.createMarketItem(nftContract, tokenId, price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})
app.post('/createMarketSale', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;
	const nftContract = req.body.nftContract;
	const itemId = req.body.itemId;
	const price = req.body.price;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.createMarketItem(nftContract, itemId, price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})

app.post('/fetchMarketItems', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.fetchMarketItems().then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})

app.post('/startgame', (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gamecode = req.body.gamecode;
	const beforeMatchURI = req.body.beforeMatchURI;
	const opponenetAddrss = req.body.opponenetAddrss;
	const stake = req.body.stake;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const game = new game(contractAddr, Provider, privKey);
	game.startGame(gamecode, beforeMatchURI, opponenetAddrss, stake).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})

})

app.post("/withdraw", (req, res) => {

	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const game = new game(contractAddr, Provider, privKey);
	game.withdraw().then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/participateGame", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const game = new game(contractAddr, Provider, privKey);
	game.participateGame(gameCode).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/endGame", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;
	const afterMatchURI = req.body.afterMatchURI;
	const result = req.body.result;
	const game = new game(contractAddr, Provider, privKey);
	game.endGme(gameCode, afterMatchURI, result).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/deposit", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const game = new game(contractAddr, Provider, privKey);
	game.deposit().then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/getPlayerBalance", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const playerAddress = req.body.playerAddress;
	const game = new game(contractAddr, Provider, privKey);
	game.getPlayerBalance(playerAddress).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/getGameDetails", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;
	const game = new game(contractAddr, Provider, privKey);
	game.getGameDetails(gameCode).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/approvertransfer", (req, res) => {

	const Provider = req.body.Provider;
	const contractAddr = tokenAddress;
	const privKey = req.body.privKey;
	const spenderAddress = req.body.spenderAddress;
	const amount = req.body.amount

	const token = new eytoken(contractAddr, Provider, privKey);
	token.approvetx(spenderAddress, amount).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})

})

app.post("/tranferfrom", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = tokenAddress;
	const privKey = req.body.privKey;
	const fromAddress = req.body.fromAddress;
	const toAddress = req.body.toAddress;
	const amount = req.body.amount;
	const token = new eytoken(contractAddr, Provider, privKey);
	token.transferFrom(spenderAddress, amount).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/creategamenft", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = nftAddress;
	const privKey = req.body.privKey;
	const tokenURI = req.body.tokenURI;
	const token = new nftoken(contractAddr, Provider, privKey);
	token.createToken(tokenURI).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/transfernft", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = nftAddress;
	const privKey = req.body.privKey;
	const fromAddress = req.body.fromAddress;
	const toAddress = req.body.toAddress;
	const tokenURI = req.body.tokenURI;
	const token = new nftoken(contractAddr, Provider, privKey);
	token.transferToken(fromAddress, toAddress, tokenURI).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})
app.listen(8080, () => {
	console.log("Serveur à l'écoute port 8080")
})