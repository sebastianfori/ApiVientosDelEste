export interface IConfigDB {
    Host: string;
    User: string;
    Password: string;
    Database: string;

    initializeConfigurations(): any;
}