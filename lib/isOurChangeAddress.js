
const myAddresses = [
    { address: "NJHArPJUknmNBL42ns6k61XApnAYzrRkow",
    changeAddress: false
    },
    {
      address: "Mxo7UBaf2f2kH1aLUvHWY2o7k6K3fkCj4b",
      changeAddress: true,
    },
  ];

export const isOurChangeAddress = (address) => {
    const newMyAddresses = myAddresses.filter(ourAddress => {
       return ourAddress.address===address && ourAddress.changeAddress===true
    })
    return newMyAddresses.length > 0?true:false
  }

  export default isOurChangeAddress