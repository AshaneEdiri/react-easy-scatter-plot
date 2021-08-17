/**
 * The functional component which tests the functionality of the library
 *
 * @version 1.0.0
 * @author ashane2e
 */
import Scatterplot from "./components/scatterplot";

function Scattermain() {
  /**
   * Import the dataset in the following format
   */
  const data = {
    scatterdata: [
      {
        itemname: "Student A",
        axis: [0, 40],
      },
      {
        itemname: "Student B",
        axis: [70, 55],
      },
      {
        itemname: "Student C",
        axis: [70, 65],
      },
      {
        itemname: "Student D",
        axis: [60, 50],
      },
      {
        itemname: "Student E",
        axis: [20, 50],
      },
      {
        itemname: "Student F",
        axis: [95, 30],
      },
      {
        itemname: "Student G",
        axis: [9, 35],
      },
    ],
  };

  /** 
   *  Make sure to use a function simillar to following to override default functionality 
   *  params : {
       "name" : itemname,
       "xdata": Value of X coordinate,
       "ydata": Value of Y coordinate
      } 
  */
  const tooltipbody = (params) => {
    return "<div>\
    <h3>This is working !</h3><hr/>\
     Title Name&ensp;: " + params.name + "<br>\
     Score&emsp;&emsp;&emsp;: " + params.xdata + "<br>\
     Time&emsp;&emsp;&nbsp&emsp;: " + params.ydata + "\
     </div>";
  };

  return (
    <div className="Scattermain">
      <Scatterplot
        title={"Scatter plot title"}
        height={500}
        width={500}
        dotsize={10}
        axis_x_max={160}
        axis_y_max={100}
        axis_x_divider={true}
        axis_y_divider={true}
        axis_x_suffix={"%"}
        axis_y_suffix={"min"}
        axis_x_name={"Score"}
        axis_y_name={"Time"}
        axis_x_threshold={70}
        axis_x_belowthreshold_label={"below threshold"}
        axis_x_belowthreshold_color={"#DC143C"}
        axis_x_abovethreshold_label={"above threshold"} //At least this label should be specified
        axis_x_abovethreshold_color={"#007500"}
        dataset={data.scatterdata}
        tooltip={(e) => tooltipbody(e)} //Can either pass as a string or as a funtion
        // tooltip={"This is tooltip"}
      />
    </div>
  );
}

export default Scattermain;
