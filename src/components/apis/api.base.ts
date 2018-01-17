abstract class ApiBase {
  protected fetch<T>(url: string) {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            resolve(response);
          } else {
            debugger;
            reject(xhr);
          }
        }
      };

    });
  }
}


export { ApiBase };
