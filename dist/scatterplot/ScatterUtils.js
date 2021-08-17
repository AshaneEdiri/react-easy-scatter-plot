export const convertSeries = (resultsFromApi, threshold, dotsize) => {
  const refinedSeries = [];
  resultsFromApi.map((value, index) => {
    return refinedSeries.push({
      name: value.itemname,
      symbolSize: dotsize || 10,
      data: convertAxisIntoData(value.axis, threshold),
      type: "scatter"
    });
  });
  return refinedSeries;
};
export const convertAxisIntoData = (axis, thres) => {
  if (axis[0] < thres) {
    return [null, axis];
  } else return [axis, null];
};