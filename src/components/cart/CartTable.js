import React from 'react';

const CartTable = ({ children }) => {
  return (
    <>
      <div className="col_table_wrap order_list">
        {children}
      </div>
    </>
  );
};

export default CartTable;


