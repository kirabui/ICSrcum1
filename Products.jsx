import React, { Component } from 'react';
import axios from "axios";
import bootstrap from "bootstrap";



export class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products : [],
      newName: '',
      newPrice: '',
      editName: '',
      editPrice: ''
       
      };
      this.newProdName = this.newProdName.bind(this);
      this.newProdPrice = this.newProdPrice.bind(this);
      this.editName = this.editName.bind(this);
      this.editPrice = this.editPrice.bind(this);
  }



  componentDidMount(){
    this.GetProductInfo();
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

  DeleteProduct = (id) => {
    axios
      .delete(`Products/DeleteProduct/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("Deleted");
        this.GetProductInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createProduct = () => {
    axios
      .post(`Products/PostProduct/`, {
        Name: this.state.newName,
        Price: parseInt(this.state.newPrice)
      })
      .then((res) => {
        console.log(res);
        console.log("Added");
        this.GetProductInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProduct = (id) => {
    console.log(this.state.editName);
    console.log(this.state.editPrice);

    axios
      .put(`Products/PutProduct/${id}`, {
        Id: parseInt(id),
        Name: this.state.editName,
        Price: parseInt(this.state.editPrice)
      })
      .then((res) => {
        console.log(res);
        console.log("Modified");
        this.GetProductInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  newProdName(event)
  {
    this.setState({newName: event.target.value});
  }

  newProdPrice(event)
  {
    this.setState({newPrice: event.target.value});
  }

  editName(event){
    this.setState({editName: event.target.value }); 
  }

  editPrice(event){
    this.setState({editPrice: event.target.value });
  }




  

  
  render() {
    const products = this.state.products

    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPro"> New Product </button>
            
            {/* Start of New Customer Modal */}
            <div className="modal" id="addPro">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Create Product</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>

                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" value={this.state.newName} onChange={this.newProdName}></input>
                      </div>
                      <div className="form-group">
                        <label >Price</label>
                        <input type="text" className="form-control" placeholder="Enter Price" value={this.state.newPrice} onChange={this.newProdPrice} ></input>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Modal footer --> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                    <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.createProduct()}>Create</button>
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
              <th>Price</th>
              <th>Actions</th>
              <th></th>
              <th>Actions</th>
              <th></th>

            </tr>
          </thead>  
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><button type="button" className="btn btn-info"  data-toggle="modal" data-target={'#edit' + item.id}> Edit </button></td>
                  <td>
                    {/* Modal Edit */}
                    <div className="modal fade" id={'edit' + item.id} role="dialog">
                      <div className="modal-dialog modal-dialog-centered">

                        {/* Modal content */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Edit Product</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <label >Name</label>
                                <input type="text" className="form-control" placeholder={item.name} value={this.state.editName} onChange={this.editName}></input>
                              </div>
                              <div className="form-group">
                                <label >Price</label>
                                <input type="text" className="form-control" placeholder={item.price} value={this.state.editAddr} onChange={this.editPrice} ></input>
                              </div>
                            </form>
                          </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                            <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.editProduct(`${item.id}`)}>Edit</button>
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
                      <div className="modal-dialog modal-dialog-centered">

                        {/* Modal content */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Delete Product</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <p>Are you sure?</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteProduct(`${item.id}`)}>Delete</button>
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
