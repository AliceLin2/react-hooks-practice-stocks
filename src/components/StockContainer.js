import React from "react";
import Stock from "./Stock";

function StockContainer({stockList, myPortList, onClickStock}) {
  return (
    <div>
      <h2>Stocks</h2>
      {stockList.map(stock=><Stock 
                              key={stock.id}
                              stock={stock} 
                              myPortList={myPortList} 
                              onClickStock={onClickStock}
                            />)}
    </div>
  );
}

export default StockContainer;
