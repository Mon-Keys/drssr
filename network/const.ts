export const ImgHost = 'http://leonidperl.in:80/'

export const baseURL = 'http://leonidperl.in:3001/api/v1';

export function getUri(path: string) {
    return ImgHost + path;
}
