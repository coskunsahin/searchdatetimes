import React, { Component } from 'react'  

import axios from "axios";  
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";    
export class Searchdata extends Component {  
    
    constructor(props) {  
        super(props)  
  
        this.state = {  
            employeedata: [],  
            startdate: '' ,  
            enddate:''   
        }  
    }  
    Changedate = (e) => {    
        this.setState({    
                startdate: e    
        });    
};  
enddate = (e) => {    
    this.setState({    
        enddate: e    
    });    
};  
    componentDidMount() {  
        axios.get('https://localhost:44348/Api/Searchdata/showdata').then(response => {  
            console.log(response.data);  
            this.setState({  
                employeedata: response.data  
            });  
        });  
    }  
    onsubmit = (e) => {    
        debugger;  
        const data = { startdate:this.state.startdate, enddate:this.state.enddate};    
        e.preventDefault();    
        axios.post('https://localhost:44348/Api/Searchdata/search',data).then(response => {  
            console.log(response.data);  
            this.setState({  
                employeedata: response.data  
            });  
        });  
}     
 
    render() {  
       
        return (  
            <div>  
               
               
                <form onSubmit={this.onsubmit}>  
                    <div className="row hdr" >  
                        <div className="col-sm-3 form-group">  </div>  
                        <div className="col-sm-3 form-group">  
                                <DatePicker className="form-control"    
                                                        selected={this.state.startdate} placeholderText="Select Date" showPopperArrow={false}    
                                                        onChange={this.Changedate}    
                                                />    
                        </div>  
                        <div className="col-sm-3 form-group">  
                                 <DatePicker className="form-control"    
                                                        selected={this.state.enddate} placeholderText="Select Date" showPopperArrow={false}    
                                                        onChange={this.enddate}    
                                                />    
                        </div>  
                        <div className="col-sm-3 form-group">  
                            <button type="submit" className="btn btn-success" >Search</button>  
                        </div>  
                    </div>  
                </form>  
                <table className="table table-hover">  
                    <thead className="thead-dark">  
                        <tr>  
                            <th scope="col">Orderid</th>  
                            <th scope="col">EmployeeID</th>  
                            <th scope="col">Name</th>
                            <th scope="col">ShipAddress</th>  
                            <th scope="col">OrderDate</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                        </tr>  
                    </thead>  
                    <tbody>  
                        {  
                    this.state.employeedata.map((p, index) => {  
                      return  <tr key={index}>  
                            <th scope="row">{p.orderid}</th>  
                            <td>{p.employeeID}</td> 
                            <td>{p.employeername}</td>  
                            <td>{p.shipAddress}</td>  
                            <td>{p.orderDate}  </td>






        <td>{new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(p.price)}</td>
                            <td>{p.quantity}</td>
                            <td>{new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 0,
          maximumFractionDigits:0}).format(p.price*p.quantity)}</td>
                        </tr>  
                    })   
                    }  
                    </tbody>  
                </table>  
  
            </div>  
        )  
    }  
}  
  
export default Searchdata  