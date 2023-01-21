const host = 'leonidperl.in';
// const host = '185.130.114.65'

export const FileHost = `http://${host}:80/`;

export const ImgHost = `http://${host}:80/`;

export const baseURL = `http://${host}:80/api/v1`;

export function getUri(path: string) {
    return ImgHost + path;
}
