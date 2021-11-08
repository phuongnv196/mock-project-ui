import { LogLevel, HubConnectionBuilder } from '@microsoft/signalr';

const getHubConnection = async (hubUri: string) => {
    const connection = new HubConnectionBuilder()
        .withUrl(`https://mock-shop.azurewebsites.net/hubs/${hubUri}`, {
            withCredentials: false
        })
        .configureLogging(LogLevel.Information)
        .build();

    try {
        await connection.start();
    } catch (e) {
        console.log(e);
    }
    return connection;
}

export { getHubConnection };