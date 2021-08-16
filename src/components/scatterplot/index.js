import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import scatterdataset from "./dummydata/scatterplotdatasetapi";
import { convertSeries } from "./ScatterUtils";

const Scatterplot = (props) => {
  const MAX_CHART_SIZE = { x_axis: 140, y_axis: 100 };
  const [testdata, setTestdata] = useState([
    {
      name: "X",
      type: "line",
      symbolSize: 0,
      data: [
        [0, 40],
        [MAX_CHART_SIZE.x_axis, 40],
      ],
      color: "#808080",
      silent: true,
      label: { show: false },
      lineStyle: {
        type: "dashed",
        width: 1,
        opacity: 0.5,
        color: "#808080",
      },
      z: 0,
    },
    {
      name: "Y",
      type: "line",
      symbolSize: 0,
      data: [
        [70, 0],
        [70, MAX_CHART_SIZE.y_axis],
      ],
      silent: true,
      label: { show: false },
      color: "#696969",
      lineStyle: {
        type: "dotted",
        opacity: 0.5,
      },
      z: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const scatterData = scatterdataset.scatterdata;
      // const prodData = await axios.get(
      //   "https://anly-agrtr-src-dev-lb-621065259.us-east-1.elb.amazonaws.com/api/v1/test",
      //   {
      //     headers: headers,
      //   }
      // );

      const scatterDataRefind = convertSeries(scatterData);
      setTestdata([...testdata, ...scatterDataRefind]);
    };
    fetchData();
    return () => {};
  }, []);

  var option = {
    height: (props.height - 150) +"px",
    width: props.width && props.width+"px",
    title: {
      show: true,
      text: "Scatter Plot",
      left: 150,
    },
    xAxis: {
      max: MAX_CHART_SIZE.x_axis,
      splitNumber: MAX_CHART_SIZE.x_axis / 8,
      name: "Score",
      nameLocation: "middle",
      // nameTextStyle: {
      //   fontSize: 20,
      // },
      nameGap: 35,
      type: "value",
      // axisLine: {
      //   show: true,
      // },
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
        },
      },
      axisTick: {
        show: true,
        inside: true,
        lineStyle: {
          type: "dashed",
        },
        alignWithLabel: true,
      },
      axisLabel: {
        formatter: function (value) {
          if (value === MAX_CHART_SIZE.x_axis / 2) {
            return value + "%";
          } else if (value === MAX_CHART_SIZE.x_axis || value === 0) {
            return value;
          } else {
            return "";
          }
        },
      },
    },
    yAxis: {
      max: MAX_CHART_SIZE.y_axis,
      splitNumber: MAX_CHART_SIZE.y_axis,
      name: "Time",
      nameLocation: "middle",
      nameGap: 10,
      type: "value",
      nameRotate: 0,
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: function (value) {
          if (value === 40) {
            return value + "min";
          } else {
            return "";
          }
        },
      },
    },

    tooltip: {
      trigger: "item", //change this
      triggerOn: "mousemove|click",
      enterable: true,
      // formatter: "<div>Student name : {a}<br /> Score,Time : {c} <br/>  <a href=\"https://google.com/\">tst</a></div>",
      formatter: function (value) {
        // console.log(value);
        return "<div>Student name : " + value.seriesName + "<br /> Score: " + value.data[0] + "<br/>Time : " + value.data[1] + '<br/>  <a href="https://google.com/">test</a></div>';
      },
    },
    visualMap: {
      type: "piecewise",

      // min: 0,
      // max: 2,
      bottom: 0,
      left: 180,
      // splitNumber: 2,
      dimension: 2,
      pieces: [
        {
          value: 0,
          label: "Below threshold",
          color: "#37A2DA",
        },
        {
          value: 1,
          label: "Above threshold",
          color: "#e06343",
        },
      ],
    },

    series: testdata,
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: props.height }} />
    </div>
  );
};

export default Scatterplot;
