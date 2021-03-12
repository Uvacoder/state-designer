export const Drugs = {
  acid: {
    name: "acid",
    minimum_price: 1000,
    maximum_price: 4400,
    cheap: {
      minimum_price: 400,
      maximum_price: 1100,
    },
    expensive: {
      minimum_price: 5000,
      maximum_price: 8000,
    },
  },
  cocaine: {
    name: "cocaine",
    minimum_price: 15000,
    maximum_price: 29000,
    expensive: {
      minimum_price: 40000,
      maximum_price: 70000,
    },
  },
  hash: {
    name: "hash",
    minimum_price: 480,
    maximum_price: 1280,
    cheap: {
      minimum_price: 130,
      maximum_price: 400,
    },
  },
  heroin: {
    name: "heroin",
    minimum_price: 5500,
    maximum_price: 13000,
    expensive: {
      minimum_price: 12000,
      maximum_price: 19000,
    },
  },
  glue: {
    name: "glue",
    minimum_price: 11,
    maximum_price: 75,
    cheap: {
      minimum_price: 2,
      maximum_price: 15,
    },
  },
  ecstasy: {
    name: "ecstasy",
    minimum_price: 1500,
    maximum_price: 4400,
  },
  opium: {
    name: "opium",
    minimum_price: 540,
    maximum_price: 1250,
    expensive: {
      minimum_price: 34000,
      maximum_price: 68000,
    },
  },
  pcp: {
    name: "pcp",
    minimum_price: 1000,
    maximum_price: 2500,
  },
  mush: {
    name: "mush",
    minimum_price: 630,
    maximum_price: 1300,
  },
  speed: {
    name: "speed",
    minimum_price: 90,
    maximum_price: 250,
    expensive: {
      minimum_price: 2000,
      maximum_price: 5000,
    },
  },
  marijuana: {
    name: "marijuana",
    minimum_price: 315,
    maximum_price: 890,
    cheap: {
      minimum_price: 60,
      maximum_price: 220,
    },
  },
}

export const Cities = {
  bronx: {
    name: "bronx",
    cops: 10,
    min_drugs: 5,
    max_drugs: 10,
  },
  brooklyn: {
    name: "brooklyn",
    cops: 70,
    min_drugs: 4,
    max_drugs: 10,
  },
  "central park": {
    name: "central park",
    cops: 5,
    min_drugs: 7,
    max_drugs: 100,
  },
  manhattan: {
    name: "manhattan",
    cops: 15,
    min_drugs: 6,
    max_drugs: 100,
  },
  "coney island": {
    name: "coney island",
    cops: 80,
    min_drugs: 4,
    max_drugs: 100,
  },
}

export const Messages = [
  100000000,
  1000000,
  400000,
  300000,
  200000,
  100000,
  50000,
  10000,
  5000,
  1000,
  0,
  -4050,
  -10000,
  -99999,
  -100000,
]
