import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AlbumData from './data/album-data';

import Routes from "./routes/Routes";
import Header from "./template/Header";
import Sidebar from "./template/Sidebar";
import DraggableDialog from "./shared/dialog/DraggableDialog";
import Modal from "./shared/modal/Modal";


// Component main, it handle all state of application
class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      albums: [],
      showConfirm: false,
      showConfirmRemovePhoto: false,
      selectedFile: null,
      photoName: null,
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

    this.handleUploadPhoto = this.handleUploadPhoto.bind(this); // function load album in server
    this.handleOnAddAlbum = this.handleOnAddAlbum.bind(this); // Function save a new Album
    this.handleAddPhotoToALbum = this.handleAddPhotoToALbum.bind(this); // Function for save photo in album in db 
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this); // Function for remove photo in db
    this.handleCancelRemovePhoto = this.handleCancelRemovePhoto.bind(this); // Function for cancel remove photo
    this.handleConfimClose = this.handleConfimClose.bind(this); // Function for close confimation dialog
    this.handleInputChange = this.handleInputChange.bind(this); // Function for monitorizar the state of the photo name to load
    this.handleGroupPhotosByDateUpLoad = this.handleGroupPhotosByDateUpLoad.bind(this); // Function return datas photo in group by create date
    this.handleOnSearch = this.handleOnSearch.bind(this); //  Function Monitorizar state of variable filter
    this.handleOnDataSearch = this.handleOnDataSearch.bind(this); //  Function return data photo by user filter --> Create date or Caption (Name photo)  
    this.handleOnShowModal = this.handleOnShowModal.bind(this); // Open detail photo --> Photo + Name
    this.hanldeOnHiddenModal = this.hanldeOnHiddenModal.bind(this);  // Close detail photo
    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this); // Function open Dialog for add photo a album 
  }

  //Life cycle of the components. It only runs before the component is mounted on the DOM, 
  UNSAFE_componentWillMount() {
    this.handleLoadAlbums(); // load information of the albums
  }

  // load information of the albums
  handleLoadAlbums() {
    AlbumData.loadAlbums()
      .then((res) => res.json())
      .then((record) => {
        this.setState({ albums: record.data });
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  // Save album in db --> AlbumData is a component for access to functions of API
  handleOnAddAlbum(values) {
    AlbumData
      .saveAlbum(values)
      .then(res => res.json())
      .then(record => {
        const data = this.state.albums;
        data.push(record.data);
        this.setState({ albums: data });
        document.location.href = '/album/' + record.data._id; // redirect to album created
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Upload photo to server
  handleUploadPhoto(e) {
    this.setState({ showConfirm: false });
    const fd = new FormData(); // creating form
    fd.append("photo", this.state.selectedFile, this.state.selectedFile.name);
    const caption = this.state.photoName || this.state.selectedFile.name; // validation, if it hasn't name, it put filename in caption
    fd.append("caption", caption);
    AlbumData
      .uploadPhoto(fd)
      .then(res => res.json())
      .then(record => {
        const data = this.state.albums;
        if (data.length === 0) {
          this.handleLoadAlbums();
        } else {
          const index = data.findIndex((e) => e._id === record.data._id); // Find position of album for update
          data[index] = record.data;
          this.setState({ albums: data });
        }
      })
      .catch(err => {
        this.setState({ response: { show: true, message: `Error: ${err}`, color: 'red' } });
        console.log("Error: ", err);
      });
  }

  // Associate photo to album in db
  handleAddPhotoToALbum(values) {
    this.setState({ openDialogAlbum: false });
    AlbumData
      .addPhotoToAlbum(values)
      .then(res => res.json())
      .then(
        record => {
          this.handleLoadAlbums(); // load data
        }
      )
      .catch(err => {
        console.log(err);
      })
    console.log(values)
  }


  // Remove photo in db
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
          const index = albums.findIndex((e) => e._id === record.data._id); // Find position of album for update
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
  
  // Cancel Remove photo 
  handleCancelRemovePhoto() {
    this.setState({ showConfirmRemovePhoto: false }); // Close confimation dialog
  }


  // Close confirmation dialog
  handleConfimClose() {
    this.setState({ showConfirm: false });
  };

  // Control state input 
  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    let value = '';
    if (e.target.type === 'file') {
      value = target.files[0];
      this.setState({ [name]: value, showConfirm: true });
    } else {
      console.log(name);
      value = target.value;
      this.setState({ [name]: value });
    }

  }

  // Creation of datas fby photo groups, filter create date and caption (photo name) 
  handleGroupPhotosByDateUpLoad(albums) {
    const data = [];
    albums = albums.filter(e => e.name === '__other'); // filter to album main.
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

  // Control state varible search
  handleOnSearch(e) {
    const target = e.target;
    this.setState({ inputSearch: target.value });
  }

  // Filter data 
  handleOnDataSearch(filter, albums) {
    const regex = new RegExp(filter, 'i');

    if (albums.length === 0) return [];

    albums = albums.filter(e => e.name === '__other');

    if (filter === null || filter === '') return albums[0].photos;

    return albums[0].photos.filter(q => (regex.test(q.caption) || regex.test(new Date(q.createdt).toLocaleDateString())));
  }


  // Show detail photo
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

  // Close datail photo
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

  // Dialog list album for associate
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
          <Sidebar />
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
              title="Photo name"
              option="input"
              nameButtom="Upload"
            />
            <DraggableDialog
              showConfirm={this.state.showConfirmRemovePhoto}
              confimClose={this.handleCancelRemovePhoto}
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
