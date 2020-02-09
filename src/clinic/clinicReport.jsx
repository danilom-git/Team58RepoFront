import React, { Component } from "react";
import Axios from "axios";
import CanvasJSReact from "../canvasjs.react";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;



class ClinicReport extends Component {

    // { x: new Date("2018-03-01"), y: 85.3},
    state = {
        clinicId: "",
        clinicReport: {},
        doctors: [],
        dataPoints: [],
        rend: false
    };

    chart = () => {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Clinic checkups"
            },
            axisX:{
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Clinic checkups by dy",
                includeZero: false,
                valueFormatString: "##0",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function(e) {
                        return CanvasJS.formatNumber(e.value, "##0");
                    }
                }
            },
            data: [{
                type: "area",
                xValueFormatString: "DD MMM",
                yValueFormatString: "##0",
                dataPoints: this.state.dataPoints
            }]
        };
      return (<CanvasJSChart options = {options}
      />);
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
        }).then(res => {
            this.setState({clinicId:res.data.clinicId});
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/clinics/report/clinic:'+res.data.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then((res) => {
                res.data.clinicRating = res.data.clinicRating.toFixed(2);
                this.setState({clinicReport:res.data});
                this.setState({doctors:res.data.doctors});
                let dates = [];
                for(let c of res.data.checkups)
                {
                    console.log("C:",c);
                    let date = new Date(c.startDate);
                    let uslov = false;
                    for(let d of dates)// da li ima vec sa tim dateom
                    {
                        console.log("D:",c);
                        d = new Date(d.x);
                        if((date.getFullYear() === d.getFullYear()) && (date.getMonth() === d.getMonth()) && (date.getDay() === d.getDay()))
                        {
                            console.log("NASAO ISTI DODAT VEC:",d);
                            uslov = true;
                            break;
                        }
                    }

                    if(!uslov)// ako nema prebroj
                    {
                        console.log("BROJI:");
                        let br = 0;
                        for(let cc of res.data.checkups)
                        {
                            cc = new Date(cc.startDate);
                            console.log("CC",cc);
                            if((date.getFullYear() === cc.getFullYear()) && (date.getMonth() === cc.getMonth()) && (date.getDay() === cc.getDay()))
                            {
                                console.log("NASAO ISTI:");
                                br = br + 1;
                            }
                        }
                        console.log("BR: ",br);
                        dates.push({x: date,y: br});
                    }


                }
                this.setState(() => ({dataPoints:dates}));
                this.setState({rend:true});
                //console.log(res.data);
            });
        });
    }

    render() {
        const doctors=  this.state.doctors.map(doctor => (
            <tr key={doctor.id}>
                <td>{doctor.name + " " + doctor.lastName}</td>
                <td>{doctor.rating}</td>
            </tr>
        ));

        console.log(this.state);
        return (<>
            <div className="row">
                <div className="col">
                    <h3 >Clinic report:</h3>
                    <div className="row">
                        <div className="col">
                            Clinic rating: {this.state.clinicReport.clinicRating}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <table className="table mt-2">
                                <thead>
                                <tr>
                                    <th scope="col">Doctor</th>
                                    <th scope="col">Rating</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {doctors}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {this.state.rend && this.chart()}
                </div>
            </div>

        </>);
    }

}export default ClinicReport;