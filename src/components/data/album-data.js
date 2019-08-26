const AlbumData = {};

const url = 'http://127.0.0.1:4100';
let headers = new Headers();

const header = {
  method: '',
  headers,
  mode: 'cors',
  cache: 'default'
}

AlbumData.saveAlbum = (album) => {
  header.method = 'POST';
  headers = new Headers({ 'Content-Type': 'application/json' });
  header.headers = headers;
  header.body = JSON.stringify(album);
  console.log(header.body);
  return fetch(`${url}/create-album`, header);
}

AlbumData.addPhotoToAlbum = (photo) => {
  header.method = 'POST';
  headers = new Headers({ 'Content-Type': 'application/json' });
  header.headers = headers;
  header.body = JSON.stringify(photo);
  return fetch(`${url}/album/add-photo`, header);
}

AlbumData.loadAlbums = () => {
  headers = new Headers();
  header.headers = headers;
  header.body = null;
  header.method = 'GET';
  return fetch(`${url}/`, header);
}

AlbumData.findById = (albumid) => {
  header.method = 'GET';
  return fetch(`${url}/find/${albumid}`, header);
}

AlbumData.uploadPhoto = (fb) => {
  headers = new Headers({ enctype: 'multipart/form-data' });
  header.headers = headers;
  header.method = 'POST';
  header.body = fb;
  return fetch(`${url}/add-photo`, header);
}

AlbumData.deletePhoto = (albumid, photoid) => {
  header.method = 'DELETE';
  return fetch(`${url}/delete/${albumid}/${photoid}`, header);
}

export default AlbumData;
