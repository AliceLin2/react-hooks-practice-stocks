import React from "react";
import Stock from "./Stock";

function PortfolioContainer({myPortList, onClickStock}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {myPortList.length === 0 ? null : myPortList.map(stock=><Stock 
                                                                key={stock.id}
                                                                stock={stock} 
                                                                onClickStock={onClickStock}
                                                              />)}
    </div>
  );
}

export default PortfolioContainer;
