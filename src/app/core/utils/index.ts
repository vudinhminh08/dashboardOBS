import _ from 'lodash';

export const trimHtmlTags = (text: string) => {
  return text?.replace(/<[^>]*>?/gm, '');
};

export const safeParseJson = (jsonValue: string | any) => {
  let objParsed = {};
  if (jsonValue && jsonValue !== '' && typeof jsonValue === 'string' && jsonValue !== null) {
    objParsed = JSON.parse(jsonValue);
  }
  return _.isObject(objParsed) ? objParsed : {};
};



export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
  // new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}


export const getValueImageBase64 = (image: string) => {

  return image?.split(';base64,')[1];
}


export const isValidHttpUrl = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}




