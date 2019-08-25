const AlbumData = {};

const url = 'http://127.0.0.1:4100';
let headers = new Headers();

const header = {
  method: '',
  headers,
  mode: 'cors',
  cache: 'default'
}

AlbumData.loadAlbums = () => {
  header.method = 'GET';
  return fetch(`${url}/`, header);
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
