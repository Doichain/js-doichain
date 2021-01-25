
const myAddresses = [
    {
        address: "N4PcsgPFjzhgTZqBXYvtHkiDjZ3ft3us1i",
        changeAddress: false
    },
    {
        address: "18pFg2tGpcc7w2agFjcK5EZK1KecqF4guK",
        changeAddress: false
    },
    {
        address: "NJHArPJUknmNBL42ns6k61XApnAYzrRkow",
        changeAddress: false
    },
    {
        address: "Mxo7UBaf2f2kH1aLUvHWY2o7k6K3fkCj4b",
        changeAddress: true,
    }
]

export const isOurAddress = (address) => {
    const newMyAddresses = myAddresses.filter(ourAddress => {
       return ourAddress.address===address
    })
    return newMyAddresses.length > 0?true:false
  }

  export default isOurAddress