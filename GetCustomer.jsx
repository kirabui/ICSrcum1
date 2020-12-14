import React, { Component } from 'react';
import axios from "axios";
import bootstrap from "bootstrap";



export class GetCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers : [],
      newName: '',
      newAddr: '',
      editName: '',
      editAddr: ''
       
      };
      this.newCusName = this.newCusName.bind(this);
      this.newCusAddr = this.newCusAddr.bind(this);
      this.editName = this.editName.bind(this);
      this.editAddr = this.editAddr.bind(this);
  }



  componentDidMount(){
    this.GetCustInfo();
  }

  GetCustInfo(){
    axios.get("Customers/GetCustomer")
    .then((res) => {
      console.log(res.data);
      this.setState({
        customers: res.data
      });
  })
  .catch((err) => {
    console.log(err);
  });
  }

  DeleteCustomer = (id) => {
    axios
      .delete(`Customers/DeleteCustomer/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("Deleted");
        this.GetCustInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCustomer = () => {
    axios
      .post(`Customers/PostCustomer/`, {
        name: this.state.newName,
        address: this.state.newAddr
      })
      .then((res) => {
        console.log(res);
        console.log("Added");
        this.GetCustInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editCustomer = (id) => {

    axios
      .put(`Customers/PutCustomer/${id}`, {
        Id: parseInt(id),
        Name: this.state.editName,
        Address: this.state.editAddr
      })
      .then((res) => {
        console.log(res);
        console.log("Modified");
        this.GetCustInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  newCusName(event)
  {
    this.setState({newName: event.target.value});
  }

  newCusAddr(event)
  {
    this.setState({newAddr: event.target.value});
  }

  showme(prams){
    console.log(`${prams}`)
    console.log(this.state.editName);
    console.log(this.state.editAddr);

  }

  editName(event){
    this.setState({editName: event.target.value }); 
  }

  editAddr(event){
    this.setState({editAddr: event.target.value });
  }




  

  
  render() {
    const customers = this.state.customers

    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addCus"> New Customer </button>
        {/* Start of New Customer Modal */}
        <div className="modal" id="addCus">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Create Customer</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" value={this.state.newName} onChange={this.newCusName}></input>
                  </div>
                  <div className="form-group">
                    <label >Address</label>
                    <input type="text" className="form-control" placeholder="Enter Address" value={this.state.newAddr} onChange={this.newCusAddr} ></input>
                  </div>
                </form>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.createCustomer()}>Create</button>
              </div>



            </div>
          </div>
        </div>



       {/* Start of Table */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Actions</th>
              <th></th>
              <th>Actions</th>
              <th></th>

            </tr>
          </thead>  
          <tbody>
            {customers.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td><button type="button" className="btn btn-info"  data-toggle="modal" data-target={'#edit' + item.id}> Edit </button></td>
                  <td>
                  
                    {/* Modal Modify */}
                    <div className="modal fade" id={'edit' + item.id} role="dialog">
                        <div className="modal-dialog modal-dialog-centered">

                          {/* Modal content */}
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">Edit Customer</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <label >Name</label>
                                <input type="text" className="form-control" placeholder={item.name} value={this.state.editName} onChange={this.editName}></input>
                              </div>
                              <div className="form-group">
                                <label >Address</label>
                                <input type="text" className="form-control" placeholder={item.address} value={this.state.editAddr} onChange={this.editAddr} ></input>
                              </div>
                            </form>
                          </div>
                            
                            <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                              <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.editCustomer(`${item.id}`)}>Edit</button>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* End of Modal */}
                   
                  </td>
                  <td><button  type="button" className="btn btn-danger"  data-toggle="modal" data-target={'#delete' + item.id}> Delete </button></td>
                  <td>  
                    {/* Modal DELETE */}
                       <div className="modal fade" id={'delete' + item.id} role="dialog">
                        <div className="modal-dialog">

                          {/* Modal content */}
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">Delete Customer</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                              <p>Are you sure?</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteCustomer(`${item.id}`)}>Delete</button>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* End of Modal */}
                    </td>  
                </tr>
              )
            })}
          </tbody>   
        
      </table>
       
      </div>
    );
  }
}
