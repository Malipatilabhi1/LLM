export interface Data {
    name: string;
    icon: string;
    selected: boolean, 
  }
  export interface UploadedData extends Data {
    inputUrl:string,
    Date:string,
  }
  export const dataConfig: Data[] = [
    {
        name: 'Youtube',
        icon: '/assets/images/youtube.logo.png',
        selected: false,    
    },
    {
        name: 'Explorer',
        icon: '/assets/images/internet.logo.png',
        selected: false,
    },
    {
        name: 'Mail',
        icon: '/assets/images/gmail.logo.png',
        selected: false,
    },
    {
        name: 'Google Drive',
        icon: '/assets/images/drive.logo.png',
        selected: false,
    },
    {
        name: 'URL',
        icon: '/assets/images/url.icon.png',
        selected: false,
    },
    {
        name: 'Json',
        icon: '/assets/images/json.icon.png',
        selected: false,
    },
    {
        name: 'PDF',
        icon: '/assets/images/pdf.icon.jpg',
        selected: false,
    },
    {
        name: 'CSV',
        icon: '/assets/images/csv.icon.png',
        selected: false,
    },
    {
        name: 'HTML',
        icon: '/assets/images/html.icon.png',
        selected: false,
    },
    {
        name: 'Text',
        icon: '/assets/images/text.icon.png',
        selected: false,
    },
    {
        name: 'Excel',
        icon: '/assets/images/excel.icon.png',
        selected: false,
    },
    {
        name: 'JPG',
        icon: '/assets/images/jpg.icon.png',
        selected: false,
    },

    
  ]