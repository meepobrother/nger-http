export function createURL(urlString: string) {
    if (!urlString.startsWith('http')) {
        urlString = `http://self${urlString}`
        return new URL(urlString);
    } else {
        return new URL(urlString)
    }
}