import React, { Component } from 'react';
import axios from "axios";
import bootstrap from "bootstrap";



export class Stores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores : [],
      newName: '',
      newAddr: '',
      editName: '',
      editAddr: ''
       
      };
      this.newStoreName = this.newStoreName.bind(this);
      this.newStoreAddr = this.newStoreAddr.bind(this);
      this.editName = this.editName.bind(this);
      this.editAddr = this.editAddr.bind(this);
  }



  componentDidMount(){
    this.GetStoreInfo();
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

  DeleteStore = (id) => {
    axios
      .delete(`Stores/DeleteStore/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("Deleted");
        this.GetStoreInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createStore = () => {
    axios
      .post(`Stores/PostStore/`, {
        Name: this.state.newName,
        Address: this.state.newAddr
      })
      .then((res) => {
        console.log(res);
        console.log("Added");
        this.GetStoreInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editStore = (id) => {
    console.log(this.state.editName);
    console.log(this.state.editPrice);

    axios
      .put(`Stores/PutStore/${id}`, {
        Id: parseInt(id),
        Name: this.state.editName,
        Address: this.state.editAddr
      })
      .then((res) => {
        console.log(res);
        console.log("Modified");
        this.GetStoreInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  newStoreName(event)
  {
    this.setState({newName: event.target.value});
  }

  newStoreAddr(event)
  {
    this.setState({newAddr: event.target.value});
  }

  editName(event){
    this.setState({editName: event.target.value }); 
  }

  editAddr(event){
    this.setState({editAddr: event.target.value });
  }




  

  
  render() {
    const stores = this.state.stores

    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addStore"> New Store </button>
        {/* Start of New Store Modal */}
        <div className="modal" id="addStore">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Create Store</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>

                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" value={this.state.newName} onChange={this.newStoreName}></input>
                      </div>
                      <div className="form-group">
                        <label >Address</label>
                        <input type="text" className="form-control" placeholder="Enter Address" value={this.state.newAddr} onChange={this.newStoreAddr} ></input>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Modal footer --> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" >Cancel</button>
                    <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.createStore()}>Create</button>
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
              <th>Address</th>
              <th>Actions</th>
              <th></th>
              <th>Actions</th>
              <th></th>

            </tr>
          </thead>  
          <tbody>
            {stores.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td><button type="button" className="btn btn-info"  data-toggle="modal" data-target={'#edit' + item.id}> Edit </button></td>
                  <td>

                    {/* Modal Edit */}
                    <div className="modal fade" id={'edit' + item.id} role="dialog">
                      <div className="modal-dialog modal-dialog-centered">

                        {/* Modal content */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Edit Store</h4>
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
                            <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.editStore(`${item.id}`)}>Edit</button>
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
                            <h4 className="modal-title">Delete Store</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <p>Are you sure?</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.DeleteStore(`${item.id}`)}>Delete</button>
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
