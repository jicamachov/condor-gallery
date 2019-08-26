import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AlbumData from './data/album-data';

import Routes from "./routes/Routes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DraggableDialog from "./DraggableDialog";
import Modal from "./shared/modal/Modal";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      albums: [],
      showConfirm: false,
      showConfirmRemovePhoto: false,
      selectedFile: null,
      namePhoto: null,
      idPhotoToRemove: null,
      idAlbumToRemove: null,
      inputSearch: null,
      imgShow: {
        show: false,
        id: null,
        path: null,
        caption: null
      },
      openDialogAlbum: false
    };

    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.handleConfimClose = this.handleConfimClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGroupPhotosByDateUpLoad = this.handleGroupPhotosByDateUpLoad.bind(this);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
    this.handleCancelRemovePotho = this.handleCancelRemovePotho.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnDataSearch = this.handleOnDataSearch.bind(this);
    this.handleOnShowModal = this.handleOnShowModal.bind(this);
    this.hanldeOnHiddenModal = this.hanldeOnHiddenModal.bind(this);
    this.handleOnAddAlbum = this.handleOnAddAlbum.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this);
    this.handleAddPhotoToALbum = this.handleAddPhotoToALbum.bind(this);
  }

  UNSAFE_componentWillMount() {
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
    AlbumData.loadAlbums()
      .then((res) => res.json())
      .then((record) => {
        this.setState({ albums: record.data });
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  handleOnAddAlbum(values) {
    console.log('add to server', values.name);

    AlbumData
      .saveAlbum(values)
      .then(res => res.json())
      .then(record => {
        console.log(record)
        const data = this.state.albums;
        data.push(record.data);
        this.setState({ albums: data });
        // setTimeout(function(){ alert("Hello"); }, 1000);
        document.location.href = '/album/' + record.data._id

      })
      .catch(err => {
        console.log(err);
      })
  }

  handleUploadPhoto(e) {
    this.setState({ showConfirm: false });
    const fd = new FormData();
    fd.append("photo", this.state.selectedFile, this.state.selectedFile.name);
    const caption = this.state.namePhoto || this.state.selectedFile.name;
    fd.append("caption", caption);
    AlbumData
      .uploadPhoto(fd)
      .then(res => res.json())
      .then(record => {
        const data = this.state.albums;
        console.log('count', data.length)
        if (data.length === 0) {
          //data.push(record.data);
          //this.setState({ albums: data });
          this.handleLoadPhotos();
        } else {
          const index = data.findIndex((e) => e._id === record.data._id);
          data[index] = record.data;
          this.setState({ albums: data });
        }
      })
      .catch(err => {
        this.setState({ response: { show: true, message: `Error: ${err}`, color: 'red' } });
        console.log("Error: ", err);
      });
  }

  handleAddPhotoToALbum(values) {
    this.setState({ openDialogAlbum: false });
    AlbumData
      .addPhotoToAlbum(values)
      .then(res => res.json())
      .then(
        record => {
          console.log('Yeahhh');
          this.handleLoadPhotos();
        },
        err => {
          console.log('Error server', err);
        }
      )
      .catch(err => {
        console.log(err);
      })

    console.log(values)
  }

  handleRemovePhoto(albumid, photoid) {
    if (this.state.showConfirmRemovePhoto === true) {
      this.setState({ showConfirmRemovePhoto: false });

      const albumid = this.state.idAlbumToRemove;
      const photoid = this.state.idPhotoToRemove;
      AlbumData
        .deletePhoto(albumid, photoid)
        .then(res => res.json())
        .then(record => {
          const albums = this.state.albums;
          const index = albums.findIndex((e) => e._id === record.data._id);
          albums[index] = record.data;
          this.setState({ albums });
        })
        .catch(err => {
          console.log("Error: ", err);
        });

    } else {
      console.log('Remove', photoid, albumid);
      this.setState({
        idPhotoToRemove: photoid,
        idAlbumToRemove: albumid,
        showConfirmRemovePhoto: true
      });
    }
  }

  handleCancelRemovePotho() {
    this.setState({ showConfirmRemovePhoto: false });
  }

  handleGroupPhotosByDateUpLoad(albums) {
    const data = [];
    albums = albums.filter(e => e.name === '__other');
    albums.forEach(album => {
      album.photos.forEach(photo => {
        photo.albumid = album._id;
        const createdt = new Date(photo.createdt).toLocaleDateString();
        const index = data.findIndex((e) => e.date === createdt);
        if (index === -1) {
          data.push({ date: createdt, photos: [photo] });
        } else {
          data[index].photos.push(photo);
        }
      });
    });

    return data;
  }


  handleOnSearch(e) {
    const target = e.target;
    this.setState({ inputSearch: target.value });
  }

  // Search 
  handleOnDataSearch(filter, albums) {
    const regex = new RegExp(filter, 'i');

    if (albums.length === 0) return [];

    albums = albums.filter(e => e.name === '__other');

    if (filter === null || filter === '') return albums[0].photos;

    return albums[0].photos.filter(q => (regex.test(q.caption) || regex.test(new Date(q.createdt).toLocaleDateString())));
  }


  handleOnShowModal(value) {
    this.setState({
      imgShow: {
        show: true,
        id: value.id,
        path: value.path,
        caption: value.caption
      }
    })
  }

  hanldeOnHiddenModal() {
    this.setState({
      imgShow: {
        show: false,
        id: null,
        path: null,
        caption: null
      }
    })
  }

  handleCloseNotification() {

  }

  handleClickOpenDialog(value) {
    console.log(value)
    this.setState({ openDialogAlbum: value });
  }



  // <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header"> // menu fixed
  render() {
    return (
      <Router>
        <div className="demo-layout mdl-layout mdl-js-layout  mdl-layout--fixed-header">
          <Header
            title={this.state.title}
            selectedPhoto={this.handleInputChange}
            search={this.handleOnSearch}
          />
          <Sidebar onChangeTitle={this.handleOnChangeTitle} />
          <main className="mdl-layout__content mdl-color--grey-100">
            <Routes
              data={this.handleGroupPhotosByDateUpLoad(this.state.albums)}
              dataSearch={this.handleOnDataSearch(this.state.inputSearch, this.state.albums)}
              dataAlbum={this.state.albums}
              removePhoto={this.handleRemovePhoto}
              openImage={this.handleOnShowModal}
              addAlbum={this.handleOnAddAlbum}
              openDialogAlbum={this.state.openDialogAlbum}
              handleClickOpenDialog={this.handleClickOpenDialog}
              handleAddPhotoToALbum={this.handleAddPhotoToALbum}
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
              title="Confimation"
              message="Wish to delete this photo?"
              option="text"
              nameButtom="Accept"
            />
            <Modal
              img={this.state.imgShow}
              close={this.hanldeOnHiddenModal}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;