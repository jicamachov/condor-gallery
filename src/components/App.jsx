import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes/Routes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DraggableDialog from "./DraggableDialog";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      photos: [],
      showConfirm: false,
      showConfirmRemovePhoto: false,
      selectedFile: null,
      namePhoto: null,
      idToRemove: null
    };

    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.handleConfimClose = this.handleConfimClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleGroupPhotosByDateUpLoad = this.handleGroupPhotosByDateUpLoad.bind(this);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
    this.handleCancelRemovePotho = this.handleCancelRemovePotho.bind(this);
  }

  componentWillMount() {
    this.handleLoadPhotos();
  }

  handleOnChangeTitle(e) {
    this.setState({ title: e.target.title });
  }

  handleConfimClose() {
    this.setState({ showConfirm: false });
  };

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    let value = '';
    if (e.target.type === 'file') {
      value = target.files[0];
      this.setState({ [name]: value, showConfirm: true });
    } else {
      value = target.value;
      this.setState({ [name]: value });
    }

  }

  handleLoadPhotos() {
    const headers = new Headers();
    const header = {
      method: 'GET',
      headers,
      mode: 'cors',
      cache: 'default'
    }
    fetch('http://127.0.0.1:4100/', header)
      .then((res) => res.json())
      .then((record) => {
        console.log('Data Traida', record.data);
        record.data.forEach(albums => {
          console.log(albums.photos);
          const data = albums.photos;
          this.setState({ photos: data });
        });
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  handleUploadPhoto(e) {
    this.setState({ showConfirm: false });
    const fd = new FormData();
    fd.append("photo", this.state.selectedFile, this.state.selectedFile.name);
    const caption = this.state.namePhoto || this.state.selectedFile.name;
    fd.append("caption", caption);
    const headers = new Headers({ enctype: 'multipart/form-data' });
    const header = {
      method: 'POST',
      headers,
      body: fd,
      mode: 'cors',
      cache: 'default'
    }
    fetch("http://127.0.0.1:4100/add-photo", header)
      .then(res => res.json())
      .then(record => {
        const data = this.handleReduce(record.data.photos, this.state.photos);
        this.setState({ photos: data });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  handleRemovePhoto(e) {
    if (this.state.showConfirmRemovePhoto === true) {
      this.setState({showConfirmRemovePhoto: false});

      const albumid = '5d61f33445a4df40c8d6b0f8';
      const photoId = this.state.idToRemove;

      const headers = new Headers();
      const header = {
        method: 'DELETE',
        headers,
        mode: 'cors',
        cache: 'default' 
      }

      fetch(`http://127.0.0.1:4100/delete/${albumid}/${photoId}`, header)
        .then(res => res.json())
        .then(record => {
          console.log('Delete', record.data);
          const data = this.handleReduce(record.data.photos, this.state.photos);
          this.setState({ photos: data });
         // const data = this.handleReduce(record.data.photos, this.state.photos);
         // this.setState({ photos: data });
        })
        .catch(err => {
          console.log("Error: ", err);
        });

    } else {
      console.log('Remove', e.target.id);
      this.setState({idToRemove: e.target.id, showConfirmRemovePhoto: true});
    }
  }

  handleCancelRemovePotho() {
    this.setState({showConfirmRemovePhoto: false});
  }

  handleReduce = (a, b) => a.filter(aa => !b.find(bb => aa['_id'] === bb['_id'])).concat(b); // a = Array 1, b = Array 2, p = property to compare


  handleGroupPhotosByDateUpLoad(photos) {
    const data = [];
    photos.forEach(photo => {
      const createdt = new Date(photo.createdt).toLocaleDateString();
      const index = data.findIndex((e) => e.date === createdt );
      if(index === -1) {
        data.push({date: createdt, photos: [photo]});
      } else {
        data[index].photos.push(photo);
      }
    });
    return data;
  }

  render() {
    console.log('Data send', this.state.photos);
    return (
      <Router>
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <Header
            title={this.state.title}
            selectedPhoto={this.handleInputChange}
          />
          <Sidebar onChangeTitle={this.handleOnChangeTitle} />
          <main className="mdl-layout__content mdl-color--grey-100">
            <Routes 
              data={this.handleGroupPhotosByDateUpLoad(this.state.photos)} 
              removePhoto={this.handleRemovePhoto}
              />
            <DraggableDialog
              showConfirm={this.state.showConfirm}
              confimClose={this.handleConfimClose}
              confirmAccept={this.handleUploadPhoto}
              inputChange={this.handleInputChange}
              title="Name photo"
              option="input"
              nameButtom="Upload"
            />
            <DraggableDialog
              showConfirm={this.state.showConfirmRemovePhoto}
              confimClose={this.handleCancelRemovePotho}
              confirmAccept={this.handleRemovePhoto}
              title="Confimación"
              message="¿Desea Eliminar la imagen?"
              option="text"
              nameButtom="Accept"
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
