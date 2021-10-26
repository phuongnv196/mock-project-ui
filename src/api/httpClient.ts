export const ContentType = {
    Json: 'application/json',
    FormData: 'multipart/form-data'
}

export class HttpClient {
    baseUrl: string = process.env.BASE_URL || "https://localhost:44342/api";

    get<T>(uri: string): Promise<T> {
        return fetch(`${this.baseUrl}/${uri}`).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>;
        })
    }
    
    post<T>(uri: string, data: any): Promise<T> {
        var postData:any = {};
        var contentType = ContentType.Json;

        if(data.constructor.name === 'FormData')
        {
            var contentType = ContentType.FormData;
        } else {
            postData = JSON.stringify(data);
        }
        
        return fetch(`${this.baseUrl}/${uri}`, {
            method: 'POST',
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

    put<T>(uri: string, data: any): Promise<T> {
        var postData:any = {};
        var contentType = ContentType.Json;
        
        if(data.constructor.name === 'FormData')
        {
            var contentType = ContentType.FormData;
        } else {
            postData = JSON.stringify(data);
        }
        
        return fetch(`${this.baseUrl}/${uri}`, {
            method: 'PUT',
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

    delete<T>(uri: string, data: any): Promise<T> {
        var postData:any = {};
        var contentType = ContentType.Json;
        
        
        if(data.constructor.name === 'FormData')
        {
            var contentType = ContentType.FormData;
        } else {
            postData = JSON.stringify(data);
        }
        
        return fetch(`${this.baseUrl}/${uri}`, {
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
