import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import RouterSite from "./RouterSite";
import Header from "./Header";
import Sidebar from "./Sidebar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      selectedFile: null
    };

    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleSelectedPhoto = this.handleSelectedPhoto.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
  }

  handleOnChangeTitle(e) {
    this.setState({ title: e.target.title });
  }

  handleSelectedPhoto(e) {
    console.log( e.target.files[0])
    this.setState({ selectedFile: e.target.files[0] });
    console.log(this.state.selectedFile);
    const loadFile = window.confirm('Subir photo')
    if (loadFile) {
      this.handleUploadPhoto();
    } else {
      this.setState({ selectedFile: null });
    } 
  }

  handleUploadPhoto() {
    const fd = new FormData();
    fd.append("photo", this.state.selectedFile, this.state.selectedFile.name);
    fd.append("caption", this.state.selectedFile.name);
    fd.append('album', "5d603ad8910c3b481851ac4b")

    const header = {
      method: 'POST',
      body: fd,
      headers:{
        'Content-Type': 'application/json'
      }
    };
    fetch("http://127.0.0.1:4100/add-photo", header)
      .then(res => res.json())
      .then(record => {
        console.log('Success', record);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  render() {
    return (
      <Router>
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <Header
            title={this.state.title}
            selectedPhoto={this.handleSelectedPhoto}
          />
          <Sidebar onChangeTitle={this.handleOnChangeTitle} />
          <main className="mdl-layout__content mdl-color--grey-100">
            <RouterSite />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
