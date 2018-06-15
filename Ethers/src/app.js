import React , { Component } from 'react';
import { View, Text } from 'react-native';

const ethers = require("ethers");



export default class app extends Component {

    renderWallet(){

        var utils = ethers.utils;
        var providers = ethers.providers;
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

        var privateKey  = "0xe6a5ec6fbe8fe9107a73a8fc5e655e7ccf91ac885783aa16dc55240379f5e10e";
        var wallet = new ethers.Wallet(privateKey)
        wallet.provider = ethers.providers.getDefaultProvider();
        console.log("Through Private Key: " + wallet.address);
        wallet.add(1000000000)
        



        var wallet_two = new ethers.Wallet.createRandom();
        console.log("Address: " + wallet_two.address);



        //Signing transactions
        var transaction = {
            nonce: 0,
            gasLimit: 21000,
            gasPrice: ethers.utils.bigNumberify("20000000000"),
        
            to: wallet_two.address,
        
            value: utils.parseEther("1.0"),
            data: "0x",
        
            // This ensures the transaction cannot be replayed on different networks
            chainId: providers.networks.homestead.chainId
        
        };

        var signedTransaction = wallet.sign(transaction);
        console.log("Signed Transaction");
        console.log(signedTransaction);
        

        
        var balancePromise = wallet.getBalance();

        balancePromise.then(function(balance) {
            console.log(balance);
        });

        var transactionCountPromise = wallet.getTransactionCount();

        transactionCountPromise.then(function(transactionCount) {
            console.log(transactionCount);
        });






    }

    renderThree(){

        //This one works. it connects to the ropsten network
        var providers = ethers.providers
        var provider = providers.getDefaultProvider('ropsten')

        var wallet_one = new ethers.Wallet("0x40fa95e2a841630e2930ecb3cb5ab248f62ec527bd366ac93362558f0b801bf3")
        wallet_one.provider = provider


        provider.getBalance(wallet_one.address).then(function(balance) {
            var etherString = ethers.utils.formatEther(balance)
            console.log("Balance: " + etherString);
            
        })

        provider.getTransactionCount(wallet_one.address).then(function(transactionCount) {
            console.log("Total Transactions Ever Send: " + transactionCount);
        });
        
        provider.resolveName("test.ricmoose.eth").then(function(address) {
            console.log("Address: " + address);
        });

        var wallet_two = new ethers.Wallet("0xcbca96b8daebae8d4f9fc280622e8d959177567cb1a8e5790e70abc8afba917f")
        wallet_two.provider = provider


        var transaction = {
            nonce: 1393250,
            gasLimit: 21000,
            gasPrice: utils.bigNumberify("20000000000"),
        
            to: wallet_two.address,
        
            value: ethers.utils.parseEther("1.0"),
            data: "0x",
        
            // This ensures the transaction cannot be replayed on different networks
            chainId: ethers.providers.networks.homestead.chainId
        };

        
        var signedTransaction = wallet_one.sign(transaction);
        var transaction = ethers.Wallet.parseTransaction(signedTransaction);

        console.log(transaction);


    }


    infuraConnection(){
        console.log("Infura is working!");
        
        const provider = new ethers.providers.InfuraProvider('ropsten', "y6R2R7BJZBAdBD0suLOE");
        const masterNode = new ethers.HDNode.fromMnemonic('humble enroll drill provide about that daring rack mosquito extra scene panel')
        
        const firstNode = masterNode.derivePath("m/44'/60'/0'/0/0");
        
        var wallet = new ethers.Wallet(firstNode.privateKey)
        wallet.provider = provider
        console.log(wallet.address);

       
        provider.getBalance(wallet.address).then(function(balance) {
            var etherString = ethers.utils.formatEther(balance)
            console.log("Wallet Balance: " + etherString);
            
        })

        const secondNode = masterNode.derivePath("m/44'/60'/0'/0/1");
        var wallet_two = new ethers.Wallet(secondNode.privateKey)
        wallet_two.provider = provider
        

        console.log(wallet_two.address);
        provider.getBalance(wallet_two.address).then(function(balance) {
            var etherString = ethers.utils.formatEther(balance)
            console.log("Wallet_two Balance: " + etherString);
            
        })


        //Conducting a transaction
        const transaction = {
           
            gasLimit: 21000,
            to: wallet.address,
            value: ethers.utils.parseEther("1.0"),
            data: "0x",
        
        };
        

        var signedTransaction = wallet_two.sign(transaction);
        // var transaction = ethers.Wallet.parseTransaction(signedTransaction);
        // console.log(transaction);

        const sendTransactionPromise = wallet_two.sendTransaction(transaction)

        sendTransactionPromise.then(function(transactionHash) {
            console.log(transactionHash);
        });

        /**
         * url: https://ropsten.infura.io/y6R2R7BJZBAdBD0suLOE 
         */




    }
    
    infuraConnectionTwo(){
        console.log("Infura is working!");
        
        const provider = new ethers.providers.InfuraProvider('ropsten', "y6R2R7BJZBAdBD0suLOE");
        var wallet = ethers.Wallet.createRandom();
        wallet.provider = provider
        
        console.log(wallet.address);
        console.log(wallet.mnemonic);
        console.log(wallet.privateKey);
        console.log(wallet.balance);
        
        provider.getBalance(wallet.address).then(function(balance) {
            var etherString = ethers.utils.formatEther(balance)
            console.log("Wallet Balance: " + etherString);
            
        })

        var wallet_two = ethers.Wallet.createRandom();
        wallet_two.provider = provider

        const transaction = {
           
            gasLimit: 21000,
            to: wallet_two.address,
            data: "0x",
        
        };
        
        const sendTransactionPromise = wallet.sendTransaction(transaction)

        sendTransactionPromise.then(function(transactionHash) {
            console.log(transactionHash);
        });

        //The transaction itself wont actually go through since both wallets are created with a balance of 0
        //  the fact it gives us that error implies that transactions can be conducted


        //This creates two different wallets on the ropsten testnet
        /**
         * For each wallet the following are accessiable:
         *      privatekey
         *      mnemonic
         *      balance
         *      address
         *      path
         *      
         */
        

        
        // const masterNode = new ethers.HDNode.fromMnemonic(wallet.mnemonic)
        
        // const firstNode = masterNode.derivePath("m/44'/60'/0'/0/0");
        

        /**
         * url: https://ropsten.infura.io/y6R2R7BJZBAdBD0suLOE 
         */

    }



    render(){
        return (
            <View>
                {this.infuraConnectionTwo()}
                <Text>Hello</Text>    
            </View>

        );
    }

}