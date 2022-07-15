# FundMe Dapp

This is a minimal dapp which implements the [FundMe Smart Contract](https://github.com/0xSanyam/Funding-Contract-HH).

## Quickstart

1. Clone the repo

   ```shell
   git clone https://github.com/0xSanyam/FundMe-Dapp
   ```

2. Run the file

   You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server".

## Implementation

When opened in a browser having metamask wallet extension, it looks like this

![First Look With Metamask](/assets/First%20Look.png)

And if you open in a browser, which doesn't have the metamask extension, then it looks like this

![No Metamask](/assets/No%20Metamask.png)

![NA](/assets/NA.png)

It prompts us with a button stating "Please install Metamask", when clicking on it, it leads us to the offical download page

![Install](/assets/Install.png)

When connected it shows us the chain id and the network id and 🛑 warns us if we are on the ethereum mainnet

![Features ChainId Network](/assets/Rinkeby.png)

![Warning](/assets/Warning.png)

If we click on the Account button(metamask connected), it shows us our current account number

![Account Connected](/assets/Account.png)

Now, let us try funding 0.05 Eth to this smart contract

> All transaction are being performed on the hardhat localhost
>
> ![Localhost](/assets/Hardhat%20Localhost.png)
>
> ![Metamask Localhost](/assets/Metamask%20Localhost.png)

![Fund](/assets/Fund.png)

After clicking the fund button

![Initiating](/assets/Initiated.png)

After pressing confirm, the funding is done!

![Completed](/assets/Funding%20Done.png)

Now, comes the withdrawal part, first we will like to see the current balance after several more transactions in this smart contract, then we'll do the withdrawal

![Balance](/assets/Balance.png)

Current balance is 999.05 Eth and the total available credit in our account is

![Wallet Balance](/assets/Wallet%20Balance.png)

After withdrawal, all the funds are now in our account!

![Withdrawing](/assets/Withdrawing.png)

![Completed](/assets/Withdrawal%20completed.png)

![Done](/assets/Withdrawing%20Done.png)
