import React, { Component } from 'react';
import axios from "axios";
import bootstrap from "bootstrap";



export class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      sales : [],
      products: [],
      stores: [],
      customers: [],
      
      newDate: '',
      newCus:'',
      newStore: '',
      newProd: '',
      
      editDate: '',
      editCus: '',
      editStore: '',
      editProd: ''
      };
      this.newStoreName = this.newStoreName.bind(this);
      this.newProdName = this.newProdName.bind(this);
      this.newDate = this.newDate.bind(this);
      this.newCus = this.newCus.bind(this);
      this.editDate = this.editDate.bind(this);
      this.editCus = this.editCus.bind(this);
      this.editStore = this.editStore.bind(this);
      this.editProd = this.editProd.bind(this);
    }
  
  newDate(event)
  {
    this.setState({newDate: event.target.value});
    console.log(this.state.newDate);
  }

  newCus(event)
  {
    this.setState({newCus: event.target.value});
    console.log(this.state.newCus);
  }
  newStoreName(event)
  {
    this.setState({newStore: event.target.value});
  }

  newProdName(event)
  {
    this.setState({newProd: event.target.value});
  }

  editDate(event){
    this.setState({editDate: event.target.value }); 
  }

  editCus(event){
    this.setState({editCus: event.target.value });
  }

  editStore(event){
    this.setState({editStore: event.target.value });
  }

  editProd(event){
    this.setState({editProd: event.target.value });
  }





  componentDidMount(){
    this.GetSalesInfo();
  }

  GetSalesInfo(){
    axios.get("Sales/GetSalesAll")
    .then((res) => {
      console.log(res.data);
      this.setState({
        sales: res.data
      });
  })
  .catch((err) => {
    console.log(err);
  });
  }

  DeleteSales = (id) => {
    axios
      .delete(`Sales/DeleteSales/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("Deleted");
        this.GetSalesInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createSale = () => {
  
    axios
      .post(`Sales/PostSales/`, {
        ProductId: parseInt(this.state.newProd),
        CustomerId: parseInt(this.state.newCus),
        StoreId: parseInt(this.state.newStore),
        DateSold: this.state.newDate
      })
      .then((res) => {
        console.log(res);
        console.log("Added");
        this.GetSalesInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editSale = (id) => {
    console.log(this.state.editDate);
    console.log(this.state.editCus);
    console.log(this.state.editProd);
    console.log(this.state.editStore); 
    axios
      .put(`Sales/PutSales/${id}`, {
        Id: parseInt(id),
        ProductId: parseInt(this.state.editProd),
        CustomerId: parseInt(this.state.editCus),
        StoreId: parseInt(this.state.editStore),
        DateSold: this.state.editDate
      })
      .then((res) => {
        console.log(res);
        console.log("Modified");
        this.GetSalesInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

GetProductInfo(){
    axios.get("Products/GetProduct")
    .then((res) => {
      console.log(res.data);
      this.setState({
        products: res.data
      });
  })
  .catch((err) => {
    console.log(err);
  });
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

  GetStoreInfo(){
    axios.get("Stores/GetStore")
    .then((res) => {
      console.log(res.data);
      this.setState({
        stores: res.data
      });
  })
  .catch((err) => {
    console.log(err);
  });
  }

  getAllinfo(){
    this.GetCustInfo();
    this.GetProductInfo();
    this.GetStoreInfo();
  }









  

  
  render() {
    const sales = this.state.sales;
    const customers = this.state.customers;
    const products = this.state.products;
    const stores = this.state.stores;

    return (
      <div>  
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addSale" onClick={() => this.getAllinfo()}> New Sale </button>
        {/* Start of New Store Modal */}
        <div className="modal" id="addSale">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Create Sale</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label >Date Sold</label>
                    <input type="date" className="form-control" value={this.state.newDate} onChange={this.newDate}></input>
                  </div>

                  <div className="form-group">
                    <label >Customer</label>
                    <select className="form-control" value={this.state.newCus} onChange={this.newCus}>
                      <option> Select an option</option>
                      {customers.map((cus) => {
                        return (
                          <option key={cus.id} value={cus.id} > {cus.name}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label >Product</label>
                    <select className="form-control" value={this.state.newProd} onChange={this.newProdName} >
                      <option> Select an option</option>
                      {products.map((prod) => {
                        return (
                          <option key={prod.id} value={prod.id}> {prod.name}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label >Store</label>
                    <select className="form-control" value={this.state.newStore} onChange={this.newStoreName} >
                      <option> Select an option</option>
                      {stores.map((store) => {
                        return (
                          <option key={store.id} value={store.id}> {store.name}</option>
                        )
                      })}
                    </select>
                  </div>

                </form>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.createSale()}>Create</button>
              </div>

            </div>
          </div>
        </div>
        
       {/* Start of Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Store</th>
              <th>Date Sold</th>
              <th>Actions</th>
              <th></th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>  
          <tbody>
            {sales.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.customer.name}</td>
                  <td>{item.product.name}</td>
                  <td>{item.store.name}</td>
                  <td>{item.dateSold.replace("T00:00:00", "")  }</td>
                  <td><button type="button" className="btn btn-info"  data-toggle="modal" data-target={'#edit' + item.id} onClick={() => this.getAllinfo()}> Edit </button></td>
                  <td>
                    {/* Modal Edit */}
                    {/* Start of Edit Modal */}
                    <div className="modal" id={'edit' + item.id}>
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                          <div className="modal-header">
                            <h4 className="modal-title">Edit Sale</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>

                          <div className="modal-body">
                            <form className="form-horizontal">
                              <div className="form-group">
                                <label >Date Sold</label>
                                <input type="date" className="form-control" value={this.state.editDate} onChange={this.editDate}></input>
                              </div>

                              <div className="form-group">
                                <label >Customer</label>
                                <select className="form-control" value={this.state.editCus} onChange={this.editCus}>
                                  <option> Select an option</option>
                                  {customers.map((cus) => {
                                    return (
                                      <option key={cus.id} value={cus.id} > {cus.name}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="form-group">
                                <label >Product</label>
                                <select className="form-control" value={this.state.editProd} onChange={this.editProd} >
                                  <option> Select an option</option>
                                  {products.map((prod) => {
                                    return (
                                      <option key={prod.id} value={prod.id}> {prod.name}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="form-group">
                                <label >Store</label>
                                <select className="form-control" value={this.state.editStore} onChange={this.editStore} >
                                  <option> Select an option</option>
                                  {stores.map((store) => {
                                    return (
                                      <option key={store.id} value={store.id}> {store.name}</option>
                                    )
                                  })}
                                </select>
                              </div>

                            </form>
                          </div>

                          {/* <!-- Modal footer --> */}
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                            <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.editSale(`${item.id}`)}>Edit</button>
                          </div>

                        </div>
                      </div>
                    </div>

                  </td>
                  <td><button  type="button" className="btn btn-danger"  data-toggle="modal" data-target={'#delete' + item.id}> Delete </button></td>
                  <td>
                    {/* Modal DELETE */}
                    <div className="modal fade" id={'delete' + item.id} role="dialog">
                      <div className="modal-dialog modal-dialog-centered">

                        {/* Modal content */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Delete Sale</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <p>Are you sure?</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteSales(`${item.id}`)}>Delete</button>
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
