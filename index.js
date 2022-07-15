// const connectButton = document.getElementById("connectButton");

import { ethers } from "./ethers-5.6.esm.min.js";
import MetaMaskOnboarding from "./node_modules/@metamask/onboarding/dist/metamask-onboarding.bundle.js";
import { abi, contractAddress } from "./constants.js";

function main() {
  const onboarding = new MetaMaskOnboarding();
  const initializeButton = document.getElementById("initialize");
  const fundButton = document.getElementById("fund");
  const chainIdButton = document.getElementById("chainId");
  const networkButton = document.getElementById("network");
  const accountButton = document.getElementById("accounts");
  const getBalanceButton = document.getElementById("balance");
  const withdrawButton = document.getElementById("withdraw");
  accountButton.onclick = account;
  getBalanceButton.onclick = getBalance;
  withdrawButton.onclick = withdraw;
  fundButton.onclick = fund;

  const connection = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
      initializeButton.innerText = "Connect";

      initializeButton.onclick = connect; // call connect func
      initializeButton.disabled = false;
    } else {
      initializeButton.innerText = "Connected";
      initializeButton.disabled = true;

      getBalanceButton.disabled = false;
      withdrawButton.disabled = false;
      fundButton.disabled = false;
    }
  };

  const install = () => {
    initializeButton.innerText = "Installation in progress";
    initializeButton.disabled = true;
    onboarding.startOnboarding();
  };

  async function account(account) {
    if (window.ethereum && ethereum.isMetaMask) {
      try {
        account = await ethereum.request({ method: "eth_accounts" });
        accountButton.innerText = account[0] || "Not able to get accounts";
        accountButton.disabled = true;
      } catch (error) {
        console.error(error);
        accountButton.innerText = `Error: ${error.message}`;
        accountButton.disabled = true;
      }
    } else {
      accountButton.innerText = "NA";
      accountButton.disabled = true;
    }
  }

  function check() {
    if (!(window.ethereum && ethereum.isMetaMask)) {
      initializeButton.innerText = "Please install MetaMask";
      initializeButton.onclick = install;

      initializeButton.disabled = false;
    } else {
      connection();
    }
  }

  async function connect() {
    if (!(typeof window.ethereum == "undefined")) {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        initializeButton.innerText = "Connected";
        initializeButton.disabled = true;
      } catch (error) {
        console.error(error);
      }
    }
  }

  check();

  async function getChainIdAndNetwork() {
    try {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      chain(chainId);
      const networkId = await ethereum.request({ method: "net_version" });
      network(networkId);
    } catch (error) {
      console.error(error);
    }
  }

  function chain(chainId) {
    if (chainId === "0x1") {
      chainIdButton.innerText = "🛑❗ You are on Ethereum Mainnet!";
      chainIdButton.disabled = true;
    } else {
      chainIdButton.innerText = `ChainId: ${chainId}`;
      chainIdButton.disabled = true;
    }
  }

  function network(networkId) {
    networkButton.innerText = `Network: ${networkId}`;
    networkButton.disabled = true;
  }

  async function fund() {
    try {
      const ethAmount = document.getElementById("ethAmount").value;
      fundButton.innerText = `Funding initiating`;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenerForTransactionMining(transactionResponse, provider);
      fundButton.innerText = `Funded ${ethAmount} Eth`;
    } catch (error) {
      console.error(error);
      fundButton.innerText = "Fund";
    }
  }

  async function withdraw() {
    try {
      withdrawButton.innerText = "Withdrawing";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transactionResponse = await contract.efficientWithdraw();
      await listenerForTransactionMining(transactionResponse, provider);
      withdrawButton.innerText = "Withdrawal Completed";
      withdrawButton.disabled = true;
    } catch (error) {
      console.error(error);
    }
  }

  function listenerForTransactionMining(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    // listen for the tx to finish
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  }

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    const formattedBalance = ethers.utils.formatEther(balance);
    getBalanceButton.innerText = `${formattedBalance} Eth`;
  }

  if (window.ethereum && ethereum.isMetaMask) {
    ethereum.autoRefreshOnNetworkChange = false;
    getChainIdAndNetwork();
    ethereum.on("chainChanged", (chainId) => {
      chain(chainId);
    });
    ethereum.on("chainChanged", network);
    ethereum.on("accountsChanged", (newAccount) => {
      account(newAccount);
    });
  } else {
    chainIdButton.innerText = "ChainId: NA";
    chainIdButton.disabled = true;
    networkButton.innerText = "Network: NA";
    networkButton.disabled = true;
  }
}

window.addEventListener("DOMContentLoaded", main);
