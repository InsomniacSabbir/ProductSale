import { isBefore } from "date-fns";

/**
 * Preprocessing the csv data to add key attribute for each item in each row of the sales data.
 * @param {[]} productData
 */
export const preProcessData = (salesData) => {
  const processedData = [];
  salesData.forEach((row, index) => {
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
 * @param {[]} saleData
 * @param {string} sortByKey
 */
export const sortSaleData = (saleData, sortByKey) => {
  const sortedData = saleData.sort((saleDataA, saleDataB) => {
    if (sortByKey === "product") {
      // Sort by product name lexicographically
      if (saleDataA[sortByKey] > saleDataB[sortByKey]) return 1;
      else if (saleDataA[sortByKey] < saleDataB[sortByKey]) return -1;
      return 0;
    } else if (sortByKey === "date") {
      // Sort by date ascending order
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
 * @param {[]} saleData
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
    revenuePerProduct[item.product] +=
      Number(item.revenue) * Number(item.sales_number);
    if (
      revenuePerProduct[item.product] > maximumRevenueEarningProduct.revenue
    ) {
      maximumRevenueEarningProduct.name = item.product;
      maximumRevenueEarningProduct.revenue = revenuePerProduct[item.product];
    }
  });

  return maximumRevenueEarningProduct;
};

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

export const getAverageSale = (saleData) => {
  const totalRevenue = saleData.reduce(
    (revenue, curr) => (revenue += Number(curr.revenue)),
    0
  );
  return totalRevenue / saleData.length;
};

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

export const getAggregatedData = () => {
    const currentUserId = localStorage.getItem('currentUserId');
  const salesData = getSalesData();
  const currentUserSalesData = salesData.filter(
    (item) => item.userId === currentUserId
  );
  return {
    avgSaleCurrentUser: getAverageSale(currentUserSalesData),
    avgSale: getAverageSale(salesData),
    mostExpensiveProduct: getMostExpensiveProduct(currentUserSalesData),
    mostRevenueEarningProduct: getMostRevenueEarningProduct(
      currentUserSalesData
    ),
    mostSoldProduct: getMostSoldProduct(currentUserSalesData),
  };
};

export const saveSalesData = (salesData) => {
  localStorage.setItem("salesData", JSON.stringify(salesData));
};

export const getSalesData = () => {
  const salesDataStr = localStorage.getItem("salesData");
  if (salesDataStr) {
    return JSON.parse(salesDataStr);
  }
  return [];
};
