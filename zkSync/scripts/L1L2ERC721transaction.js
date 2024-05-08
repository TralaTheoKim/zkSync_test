const { ethers : hEthers } = require("hardhat");
const { Contract, ContractFactory, ethers, utils } = require("ethers")

const nftContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // local eth l1
const sepNftContractAddress = "0x7Bd7f6BCc9B466D566b133f15e58a95C193C93DD"  // sepolia eth l1 nft contract
const mailBoxAddress = "0x2eD8eF54a16bBF721a318bd5a5C0F39Be70eaa65"  // sepolia testnet
// const zkSyncAddress = "0x2ed8eF54a16bBF721a318bd5a5C0F39Be70eaa65" // 
const l2BridgeAddress = "0xEdc36452dc06699B8C851D646c86BDeA7F358CB8"

async function main() {
    const [deployer] = await hEthers.getSigners();
    console.log("deployer : ", deployer.address)

    // ===== l1 erc721 bridge contract
    const L1ERC721Bridge = await hEthers.getContractFactory("L1ERC721Bridge")
    // const l1ERC721Bridge = await L1ERC721Bridge.deploy(sepNftContractAddress, mailBoxAddress)
    // await l1ERC721Bridge.deployed();

    // console.log("L1ERC721Bridge deployed to:", l1ERC721Bridge.address);
    // ===== l1 erc721 bridge contract deploy


    // const l1BridgeAddress = "0x2A3Dc98Bc0Cc50d2dB49D72C21025E131b7e14d2"
    const l1BridgeAddress =  "0x55dC9bEDB73b9a3AaE959dCE99fdc53002B0de46"
    const l1Bridge = L1ERC721Bridge.attach(l1BridgeAddress)
    console.log("l1 bridge : ", l1Bridge)

    // ======= set tx
    // const setTx = await l1Bridge.setL2BridgeAddress(l2BridgeAddress)
    // await setTx.wait();
    // console.log("L2 bridge address set successfully. Transaction Hash:", setTx.hash);
    // ====== set tx
    

    // const l2BridgeSet = await l1Bridge.l2BridgeAddress();
    // console.log(`Currently set L2 Bridge Address: ${l2BridgeSet}`);

    //===== deposit
    // const tokenId = 1;
    // try {
    //     const depositTx = await l1Bridge.deposit(tokenId, deployer.address, {
    //         gasLimit: 500000,
    //     })
    //     await depositTx.wait();
    //     console.log(`Deposit transaction successful: ${depositTx.hash}`);
    // } catch(error) {
    //     console.error('Error during deposit : ', error)
    // }
    // ======= deposit


    // const depositTx = await l1Bridge.deposit(tokenId, deployer.address, {
    //     gasLimit: 500000,
    // })
    // await depositTx.wait();
    // console.log(`Deposit transaction successful: ${depositTx.hash}`);

    // console.log("L1ERC721Bridge deployed to : ", l1ERC721Bridge.address)

    // const NFTContract = await hEthers.getContractFactory("NFTTEST")
    // const nftContract = await NFTContract.deploy()
    // console.log("nft contract : ", nftContract.address)

    //====== nft contract deploy
    // const nftArtifact = await hEthers.getContractAt("NFTTEST", nftContractAddress, deployer)
    // console.log("nft artifact : ", nftArtifact)

    //====== nft contract setting
    // var initTx = await nftArtifact.connect(deployer).initialize("TEST", "TN")
    // await initTx.wait()
    // console.log("init tx : ", initTx)

    //====== 
    



//     const [deployer] = await hEthers.getSigners();
//     console.log("Owner address : ", deployer.address);
    
//     /**
//      * Token & router contract deployment
//      */
//     console.log(">>>>>>>>>>>>>> Token & router contract deployment");
//     const tralaFactory = await hEthers.getContractFactory("TralaTokenContract");
//     const trala = await tralaFactory.deploy();
//     console.log(":::: TRALA address : ", trala.address);
    
//     const topazFactory = await hEthers.getContractFactory("TopazTokenContract");
//     const topaz = await topazFactory.deploy("TOPAZ Token","TOPAZ");
//     console.log(":::: TOPAZ address : ", topaz.address);
    
//     const routerFactory = await hEthers.getContractFactory("TralaRouter");
//     const router = await routerFactory.deploy(trala.address, topaz.address);
//     console.log(":::: Trala Router address : ", router.address);
    
//     /**
//      * Set router for faucet
//      */
//     console.log(">>>>>>>>>>>>>> Set router for faucet");
//     new Promise(resolve => setTimeout(resolve, 3000));

//     var tx = await deployer.sendTransaction({ 
//       to: router.address,
//       value: ethers.utils.parseEther("1000")
//     })
//     await tx.wait()
//     console.log("Eth transfer to router ok. hash :", tx.hash);
  
//     tx = await trala.transfer(router.address, ethers.utils.parseEther("10000000"))
//     await tx.wait()
//     console.log("Trala transfer to router ok. hash :", tx.hash);
  
//     tx = await topaz.mint(router.address, ethers.utils.parseEther("10000000000"))
//     await tx.wait()
//     console.log("Topaz mint to router ok. hash :", tx.hash);

//     tx = await topaz.mint(deployer.address, ethers.utils.parseEther("100000000000"))
//     await tx.wait()
//     console.log("Topaz mint to owner ok. hash :", tx.hash);
  
//     /**
//      * NFT contract deployment
//      */
//     console.log(">>>>>>>>>>>>>> NFT contract deployment");
//     const NFTFactoryFactory = await hEthers.getContractFactory("NFTFactoryContractV1");
//     const NFTFactory = await NFTFactoryFactory.deploy();
//     console.log(":::: NFTFactory address : ", NFTFactory.address);

//     tx = await NFTFactory.deployERC721("FreeStyle", "FS", "https://api-stage.trala.me/static/json/metadata/");
//     await tx.wait();
//     console.log("FS test contract deploy ok, hash : ", tx.hash)
//     console.log(":::: NFT Proxy address : ", await NFTFactory.getProxyContractAddressByIndex(0))

//     /**
//      * UniswapV3 contract deployment
//      */
//     console.log(">>>>>>>>>>>>>> UniswapV3 contract deployment");
//     const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
//         Object.keys(linkReferences).forEach((fileName) => {
//           Object.keys(linkReferences[fileName]).forEach((contractName) => {
//             if (!libraries.hasOwnProperty(contractName)) {
//               throw new Error(`Missing link library name ${contractName}`)
//             }
//             const address = utils
//               .getAddress(libraries[contractName])
//               .toLowerCase()
//               .slice(2)
//             linkReferences[fileName][contractName].forEach(
//               ({ start, length }) => {
//                 const start2 = 2 + start * 2
//                 const length2 = length * 2
//                 bytecode = bytecode
//                   .slice(0, start2)
//                   .concat(address)
//                   .concat(bytecode.slice(start2 + length2, bytecode.length))
//               }
//             )
//           })
//         })
//         return bytecode
//     }
//     const artifacts = {
//         UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
//         SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
//         NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
//         NonfungibleTokenPositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
//         NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
//         WETH9,
//         UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
//         Quoter: require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"),
//         QuoterV2: require("@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json"),
//     }
//     const wethFactory = new ContractFactory(artifacts.WETH9.abi, artifacts.WETH9.bytecode, deployer);
//     const weth = await wethFactory.deploy();
//     console.log(":::: Weth address : ", weth.address)

//     const uniswapV3FactoryFactory = new ContractFactory(artifacts.UniswapV3Factory.abi, artifacts.UniswapV3Factory.bytecode, deployer)
//     const uniswapV3Factory = await uniswapV3FactoryFactory.deploy()
//     console.log(":::: Factory address : ", uniswapV3Factory.address)

//     const swapRouterFactory = new ContractFactory(artifacts.SwapRouter.abi, artifacts.SwapRouter.bytecode, deployer);
//     const uniswapRouter = await swapRouterFactory.deploy(uniswapV3Factory.address, weth.address);
//     console.log(":::: SwapRouter address : ", uniswapRouter.address)

//     const NFTDescriptorFactory = new ContractFactory(artifacts.NFTDescriptor.abi, artifacts.NFTDescriptor.bytecode, deployer);
//     const NFTDescriptor = await NFTDescriptorFactory.deploy();
//     console.log(":::: NFTDescriptor address : ", NFTDescriptor.address)

//     const linkedBytecode = linkLibraries(
//         {
//           bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
//           linkReferences: {
//             "NFTDescriptor.sol": {
//               NFTDescriptor: [
//                 {
//                   length: 20,
//                   start: 1681,
//                 },
//               ],
//             },
//           },
//         },
//         {
//           NFTDescriptor: NFTDescriptor.address,
//         }
//       );

//     const NFTPositionDescriptorFactory = new ContractFactory(artifacts.NonfungibleTokenPositionDescriptor.abi, linkedBytecode, deployer);
//     const NFTPositionDescriptor = await NFTPositionDescriptorFactory.deploy(weth.address, '0x4554480000000000000000000000000000000000000000000000000000000000');
//     console.log(":::: NonfungibleTokenPositionDescriptor address : ", NFTPositionDescriptor.address)

//     const NFTPositionManagerFactory = new ContractFactory(artifacts.NonfungiblePositionManager.abi, artifacts.NonfungiblePositionManager.bytecode, deployer);
//     const NFTPositionManager = await NFTPositionManagerFactory.deploy(uniswapV3Factory.address, weth.address, NFTPositionDescriptor.address);
//     console.log(":::: NonfungiblePositionManager address : ", NFTPositionManager.address)

//     const quoterFactory = new ContractFactory(artifacts.Quoter.abi, artifacts.Quoter.bytecode, deployer);
//     const quoter = await quoterFactory.deploy(uniswapV3Factory.address, weth.address);
//     console.log(":::: Quoter address : ", quoter.address)

//     const quoterV2Factory = new ContractFactory(artifacts.QuoterV2.abi, artifacts.QuoterV2.bytecode, deployer);
//     const quoterV2 = await quoterV2Factory.deploy(uniswapV3Factory.address, weth.address);
//     console.log(":::: QuoterV2 address : ", quoterV2.address)

//     /**
//      * Luquidity pool deployment
//      */
//     console.log(">>>>>>>>>>>>>> Luquidity pool deployment");
//     const price = 100; // token0 대비 token1의 가격 1:100
//     const sqrtPrice = Math.sqrt(price);
//     const fee = {
//         low : 500,
//         medium : 3000,
//         high : 10000
//     }
//     const sqrtPriceX96 = ethers.BigNumber.from(Math.floor(sqrtPrice * 1e18).toString())
//       .mul(ethers.BigNumber.from(2).pow(96))
//       .div(ethers.BigNumber.from(10).pow(18));

//     tx = await NFTPositionManager.createAndInitializePoolIfNecessary(trala.address, topaz.address, fee.low, sqrtPriceX96, { gasLimit: 5000000 })
//     await tx.wait()
//     console.log("Liquidity ool deploy ok. hash :", tx.hash);

//     var poolAddress = await uniswapV3Factory.getPool(trala.address, topaz.address, fee.low)
//     console.log(":::: Pool address : ", poolAddress)

//    /**
//     * Add liquidity to pool
//     */
//     console.log(">>>>>>>>>>>>>> Add liquidity to pool");
//     const tralaToken = new Token(900, trala.address, 18, 'TRALA', 'TRALA Token')
//     const topazToken = new Token(900, topazAddress, 18, 'TOPAZ', 'TOPAZ Token')

//     const poolContract = new Contract(poolAddress, artifacts.UniswapV3Pool.abi, deployer)
//     const poolData = await getPoolData(poolContract)

//     const pool = new Pool(
//         tralaToken,
//         topazToken,
//         poolData.fee,
//         poolData.sqrtPriceX96.toString(),
//         poolData.liquidity.toString(),
//         poolData.tick
//     )
//     // liquidity 에 어떤값 넣는지 확인할 필요.
//     const position = new Position({
//         pool: pool,
//         liquidity: ethers.utils.parseEther('10000'),
//         tickLower: nearestUsableTick(TickMath.MIN_TICK, poolData.tickSpacing),
//         tickUpper: nearestUsableTick(TickMath.MAX_TICK, poolData.tickSpacing),
//     })

//     const { amount0: amount0Desired, amount1: amount1Desired} = position.mintAmounts

//     params = {
//         token0: trala.address,
//         token1: topaz.address,
//         fee: poolData.fee,
//         tickLower: nearestUsableTick(TickMath.MIN_TICK, poolData.tickSpacing),
//         tickUpper: nearestUsableTick(TickMath.MAX_TICK, poolData.tickSpacing),
//         amount0Desired: amount0Desired.toString(),
//         amount1Desired: amount1Desired.toString(),
//         amount0Min: 0,
//         amount1Min: 0,
//         recipient: deployer.address,
//         deadline: Math.floor(Date.now() / 1000) + (60 * 10)
//     }

//     tx = await trala.approve(NFTPositionManager.address, ethers.utils.parseUnits(amount0Desired.toString(), "wei"))
//     await tx.wait()
//     console.log("Trala approve ok. amounts : ", amount0Desired.toString())
//     tx = await topaz.approve(NFTPositionManager.address, ethers.utils.parseUnits(amount1Desired.toString(), "wei"))
//     await tx.wait()
//     console.log("Topaz approve ok. amounts : ", amount1Desired.toString())

//     var receipt = await NFTPositionManager.mint(params, {gasLimit : '1000000'})
//     await receipt.wait()
//     console.log("Add Liquidity ok. hash : ", receipt.hash)
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });