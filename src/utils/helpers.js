import { isBefore } from "date-fns";

/**
 * Preprocessing the csv data to add key attribute for each item in each row of the sales data.
 * @param {array} salesData
 */
export const preProcessData = (salesData) => {
  const processedData = [];
  salesData.forEach((row, index) => {
    // Checking if the current row is empty or not. If the row is empty we are ignoring that row.
    if (row[0]) {
      processedData.push({
        id: index,
        date: row[0],
        product: row[1],
        sales_number: row[2],
        revenue: row[3],
        userId: row[4],
      });
    }
  });
  return processedData;
};

/**
 * Sort sales data by user defined sort key.
 * @param {array} saleData
 * @param {string} sortByKey
 */
export const sortSaleData = (saleData, sortByKey) => {
  const sortedData = saleData.sort((saleDataA, saleDataB) => {
    if (sortByKey === "product") {
      if (saleDataA[sortByKey] > saleDataB[sortByKey]) return 1;
      else if (saleDataA[sortByKey] < saleDataB[sortByKey]) return -1;
      return 0;
    } else if (sortByKey === "date") {
      const dateA = new Date(saleDataA[sortByKey]);
      const dateB = new Date(saleDataB[sortByKey]);

      if (isBefore(dateA, dateB)) return -1;
      else if (!isBefore(dateA, dateB)) return 1;
      return 0;
    }
    return Number(saleDataA[sortByKey]) - Number(saleDataB[sortByKey]);
  });

  return sortedData;
};

/**
 * Find the most revenue earning product.
 * @param {array} saleData
 */
export const getMostRevenueEarningProduct = (saleData) => {
  let maximumRevenueEarningProduct = {
    name: "",
    revenue: 0,
  };

  let revenuePerProduct = {};
  saleData.forEach((item) => {
    if (!revenuePerProduct.hasOwnProperty(item.product)) {
      revenuePerProduct[item.product] = 0;
    }
    revenuePerProduct[item.product] += Number(item.revenue);
    if (
      revenuePerProduct[item.product] > maximumRevenueEarningProduct.revenue
    ) {
      maximumRevenueEarningProduct.name = item.product;
      maximumRevenueEarningProduct.revenue = revenuePerProduct[item.product];
    }
  });

  return maximumRevenueEarningProduct;
};

/**
 * Find the most sold product from the given saleData
 * @param {array} saleData 
 */
export const getMostSoldProduct = (saleData) => {
  let mostSoldProduct = {
    name: "",
    count: 1,
  };

  let sellCountPerProduct = {};
  saleData.forEach((item) => {
    if (!sellCountPerProduct.hasOwnProperty(item.product)) {
      sellCountPerProduct[item.product] = 0;
    }
    sellCountPerProduct[item.product] += Number(item.sales_number);
    if (sellCountPerProduct[item.product] > mostSoldProduct.count) {
      mostSoldProduct.name = item.product;
      mostSoldProduct.count = sellCountPerProduct[item.product];
    }
  });
  return mostSoldProduct;
};

/**
 * Calculate the average revenue for the given saleData
 * @param {array} saleData 
 */
export const getAverageSale = (saleData) => {
  const totalRevenue = saleData.reduce(
    (revenue, curr) => (revenue += Number(curr.revenue)),
    0
  );
  return totalRevenue / saleData.length;
};

/**
 * Find the most expensive product from the saleData.
 * @param {array} saleData 
 */
export const getMostExpensiveProduct = (saleData) => {
  return saleData.reduce((prev, curr, index) => {
    const prevItemPricePerUnit =
      Number(prev.revenue) / Number(prev.sales_number);
    const currItemPricePerUnit =
      Number(curr.revenue) / Number(curr.sales_number);
    if (index === 0 || prevItemPricePerUnit < currItemPricePerUnit) {
      prev = curr;
    }
    return prev;
  }, {});
};
