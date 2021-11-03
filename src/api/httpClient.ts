export const ContentType = {
    Json: 'application/json',
    FormData: 'multipart/form-data'
}

const baseUrl: string = process.env.BASE_URL || "https://mock-shop.azurewebsites.net/api";
export class HttpClient {

    get<T>(uri: string): Promise<T> {
        console.log(baseUrl);
        return fetch(`${baseUrl}/${uri}`).then((response) => {
            console.log(response);
            if (!response.ok) {
                console.log(response.statusText);
                throw new Error(`${response.statusText} ${response.text()}`);
            }
            return response.json() as Promise<T>;
        }).catch((error) => {
            debugger;
            console.log(error);
            throw new Error(`${error.statusText} ${error.text()}`);
        });
    }
    
    post<T>(uri: string, data: any): Promise<T> {
        var postData:any = data;
        var contentType = ContentType.Json || undefined;
        var header = {
            'Content-Type': contentType
        } || undefined;
        if(data.constructor.name === 'FormData')
        {
            delete header['Content-Type'];
        } else {
            postData = JSON.stringify(data);
        }

        return fetch(`${baseUrl}/${uri}`, {
            method: 'POST',
            headers: header as HeadersInit,
            body: postData
          }).then( async (response) => {
            if (!response.ok) {
                var data = await response.text();
                throw new Error(`${data || response.statusText}`);
            }
            return response.json() as Promise<T>;
          });
    }

    put<T>(uri: string, data: any): Promise<T> {
        var postData:any = data;
        var contentType = ContentType.Json || undefined;
        var header = {
            'Content-Type': contentType
        } || undefined;
        if(data.constructor.name === 'FormData')
        {
            delete header['Content-Type'];
        } else {
            postData = JSON.stringify(data);
        }
        
        return fetch(`${baseUrl}/${uri}`, {
            method: 'PUT',
            headers: header as HeadersInit,
            body: postData
          }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>;
          });
    }

    delete<T>(uri: string, data: any): Promise<T> {
        var postData:any = {};
        var contentType = ContentType.Json;
        
        
        if(data.constructor.name === 'FormData')
        {
            var contentType = ContentType.FormData;
        } else {
            postData = JSON.stringify(data);
        }
        
        return fetch(`${baseUrl}/${uri}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': contentType
            },
            body: postData
          }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>;
          });
    }
}
