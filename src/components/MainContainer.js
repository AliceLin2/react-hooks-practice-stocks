import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  let sorted
  const [stockList, setStockList] = useState([])
  const [myPortList, setMyPortList] = useState([])
  const [sortByName, setSortByName] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [filtered, setFiltered] = useState("All")
  const stocksOnExchange = document.querySelector('.col-8')
  const stocksInPortfolio = document.querySelector('.col-4')
  
  useEffect(()=>{
    fetch("http://localhost:3001/stocks")
    .then(r=>r.json())
    .then(data=>setStockList(data))
  }, [])

  function handleClickStock(e, stock){
    if(stocksOnExchange.contains(e.target)){
      const newPortList = [...myPortList, stock]
      setMyPortList(newPortList)
    }else if(stocksInPortfolio.contains(e.target)){
      const newPortList = myPortList.filter((co)=>co.id!==stock.id)
      setMyPortList(newPortList)
    }
  }

  if(sortByName===true){
    sorted = [...stockList].sort((a,b)=>{
      if(a.ticker>b.ticker){
        return 1
      }else if(a.ticker<b.ticker){
        return -1
      }else{
        return 0
      }
    })
  }else if(sortByPrice===true){
    sorted = [...stockList].sort((a,b)=>a.price-b.price)
  }else{
    sorted = [...stockList]
  }

  const filteredList = sorted.filter((stock)=>{
    if(filtered==="All"){
      return true
    }else{
      return stock.type===filtered
    }
  })

  return (
    <div>
      <SearchBar 
        sortByName={sortByName} 
        onSortByName={setSortByName} 
        sortByPrice={sortByPrice} 
        onSortByPrice={setSortByPrice} 
        onFilter={setFiltered}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stockList={filteredList} onClickStock={handleClickStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myPortList={myPortList} onClickStock={handleClickStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
