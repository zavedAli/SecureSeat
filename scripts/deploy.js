const hre = require("hardhat");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await hre.ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TM";

  // Deploy contract
  const TokenMaster = await hre.ethers.getContractFactory("TokenMaster");
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`);

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "6:00PM EST",
      location: "Miami-Dae Arena - Miami, FL",
      genre: "Sports",
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM JST",
      location: "Tokyo, Japan",
      genre: "conference",
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul",
      genre: "competetion",
    },
    {
      name: "Dallas Mavericks vs. San Antonio Spurs",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM CST",
      location: "American Airlines Center - Dallas, TX",
      genre: "sports",
    },
    {
      name: "ETH Global Toronto",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Toronto, Canada",
      genre: "summit",
    },
    {
      name: "TATA Candidate Meet",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "New Delhi, India",
      genre: "summit",
    },
    {
      name: "Golden Jublee Assam Tribune",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Guwahati, India",
      genre: "conference",
    },
    {
      name: "TOI confrence editor summit",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Hydrabad, India",
      genre: "conference",
    },
    {
      name: "Sunburn Bangalore(club party)",
      cost: tokens(0.75),
      tickets: 200,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Bangalore, India",
      genre: "music",
    },
    {
      name: "Houdini Heist",
      cost: tokens(0.75),
      tickets: 200,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Kolkata, India",
      genre: "Magic",
    },
  ];

  for (var i = 0; i < occasions.length; i++) {
    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location,
        occasions[i].genre
      );

    await transaction.wait();

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
