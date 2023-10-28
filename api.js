export default class APIFetch {
  async getData(url) {
    const data = await fetch(url, {
      method: 'GET',
    });
    const parsedData = await data.json();
    return parsedData;
  }
  async addData(url, title, body, userId) {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    const parsedData = await data.json();
    return parsedData;
  }
  async changeData(url, postId, title, body, userId) {
    const resource = `${url}/${postId}`
    const data = await fetch(resource, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
        title: title,
        body: body,
        userId: userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    const parsedData = await data.json();
    return parsedData;
  }
  async changeDataPartially(url, title, postId) {
    const resource = `${url}/${postId}`
    const data = await fetch(resource, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    const parsedData = await data.json();
    return parsedData;
  }
  async deleteData(url, postId) {
    const resource = `${url}/${postId}`
    const data = await fetch(resource, {
      method: 'DELETE',
    });
    const parsedData = await data.json();
    return parsedData;
  }
}




