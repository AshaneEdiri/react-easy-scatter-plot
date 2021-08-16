export const convertSeries = resultsFromApi => {
  const refinedSeries = [];
  resultsFromApi.map((value, index) => {
    refinedSeries.push({
      name: value.studentname,
      symbolSize: 10,
      data: convertAxisIntoData(value.axis),
      type: "scatter"
    });
  });
  return refinedSeries;
};
export const convertAxisIntoData = axis => {
  if (axis[0] < 70) {
    return [null, axis];
  } else return [axis, null];
};