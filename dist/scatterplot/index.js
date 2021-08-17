/**
 * The react-easy-scatter-plot component
 *
 * @version 1.0.0
 * @author ashane2e
 */
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import scatterdataset from "./dummydata/scatterplotdatasetapi";
import { convertSeries } from "./ScatterUtils";

const Scatterplot = props => {
  const MAX_CHART_SIZE = {
    x_axis: props.axis_x_max,
    y_axis: props.axis_y_max
  };
  const [testdata, setTestdata] = useState([{
    name: "X",
    type: "line",
    symbolSize: 0,
    data: props.axis_y_divider ? [[0, MAX_CHART_SIZE.y_axis / 2], [MAX_CHART_SIZE.x_axis, MAX_CHART_SIZE.y_axis / 2]] : [],
    color: "#808080",
    silent: true,
    label: {
      show: false
    },
    lineStyle: {
      type: "dashed",
      width: 1,
      opacity: 0.5,
      color: "#808080"
    },
    z: 0
  }, {
    name: "Y",
    type: "line",
    symbolSize: 0,
    data: props.axis_x_divider ? [[MAX_CHART_SIZE.x_axis / 2, 0], [MAX_CHART_SIZE.x_axis / 2, MAX_CHART_SIZE.y_axis]] : [],
    silent: true,
    label: {
      show: false
    },
    color: "#808080",
    lineStyle: {
      type: "dashed",
      width: 1,
      opacity: 0.5,
      color: "#808080"
    },
    z: 0
  }]);
  useEffect(() => {
    const fetchData = async () => {
      const scatterData = props.dataset || scatterdataset.scatterdata; // const scatterData = scatterdataset.scatterdata;
      // const prodData = await axios.get(
      //   "https://anly-agrtr-src-dev-lb-621065259.us-east-1.elb.amazonaws.com/api/v1/test",
      //   {
      //     headers: headers,
      //   }
      // );

      const scatterDataRefind = convertSeries(scatterData, props.axis_x_threshold, props.dotsize);
      setTestdata([...testdata, ...scatterDataRefind]);
    };

    fetchData();
    return () => {};
  }, [props]);
  var option = {
    height: props.height - 150 + "px",
    width: props.width && props.width + "px",
    title: {
      show: true,
      text: props.title,
      left: 120
    },
    xAxis: {
      max: MAX_CHART_SIZE.x_axis,
      splitNumber: MAX_CHART_SIZE.x_axis / 8,
      name: props.axis_x_name,
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
          type: "dashed"
        }
      },
      axisTick: {
        show: true,
        inside: true,
        lineStyle: {
          type: "dashed"
        },
        alignWithLabel: true
      },
      axisLabel: {
        formatter: function (value) {
          if (value === MAX_CHART_SIZE.x_axis / 2) {
            return props.axis_x_suffix ? value + props.axis_x_suffix : value;
          } else if (value === MAX_CHART_SIZE.x_axis || value === 0) {
            return value;
          } else {
            return "";
          }
        }
      }
    },
    yAxis: {
      max: MAX_CHART_SIZE.y_axis,
      splitNumber: MAX_CHART_SIZE.y_axis / 8,
      name: props.axis_y_name,
      nameLocation: "middle",
      nameGap: 55,
      type: "value",
      nameRotate: 0,
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed"
        }
      },
      axisTick: {
        show: true,
        inside: true,
        lineStyle: {
          type: "dashed"
        },
        alignWithLabel: true
      },
      axisLabel: {
        formatter: function (value) {
          if (value === MAX_CHART_SIZE.y_axis / 2) {
            return props.axis_y_suffix ? value + props.axis_y_suffix : value;
          } else if (value === MAX_CHART_SIZE.y_axis || value === 0) {
            return value;
          } else {
            return "";
          }
        }
      }
    },
    tooltip: {
      trigger: "item",
      //change this
      triggerOn: "mousemove|click",
      enterable: true,
      // formatter: "<div>Student name : {a}<br /> Score,Time : {c} <br/>  <a href=\"https://google.com/\">tst</a></div>",
      formatter: function (value) {
        // console.log(value);
        const body = {
          name: value.seriesName,
          xdata: value.data[0],
          ydata: value.data[1]
        }; //console.log(props.tooltip(body) || null)
        // return props.tooltip;

        return typeof props.tooltip === "function" ? props.tooltip(body) : props.tooltip;
      }
    },
    visualMap: {
      type: "piecewise",
      // min: 0,
      // max: 2,
      bottom: 0,
      left: 180,
      // splitNumber: 2,
      dimension: 2,
      pieces: props.axis_x_belowthreshold_label ? [{
        value: 0,
        label: props.axis_x_abovethreshold_label || "default label",
        color: props.axis_x_abovethreshold_color || "#37A2DA"
      }, {
        value: 1,
        label: props.axis_x_belowthreshold_label || "default",
        color: props.axis_x_belowthreshold_label ? props.axis_x_belowthreshold_color || "#e06343" : "#FFFFFF"
      }] : [{
        value: 0,
        label: props.axis_x_abovethreshold_label || "default label",
        color: props.axis_x_abovethreshold_color || "#37A2DA"
      }]
    },
    series: testdata
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReactECharts, {
    option: option,
    style: {
      height: props.height || 500
    }
  }));
};

export default Scatterplot;