import { SettingsType } from '../lib/types';

export const scrolledToBottom = (target: HTMLInputElement) => {
    return Math.floor(target.scrollHeight - target.scrollTop) === target.clientHeight - 1;
};

export const getFields = (settings: SettingsType) => {
    return parseFields(settings);
};

function parseFields(settings: SettingsType, dataPrefix?: string) {
    const fieldsChunk = [];
    for (const fieldName in settings) {
        if (settings.hasOwnProperty(fieldName)) {
            const fieldValue = settings[fieldName];
            if (typeof fieldValue !== 'object') {
                fieldsChunk.push({
                    name: prettifyFieldName(fieldName),
                    value: `${dataPrefix ? `${dataPrefix}.` : ''}${fieldName}`,
                });
            } else {
                const nextChunk = parseFields(fieldValue, fieldName);
                fieldsChunk.push(nextChunk);
            }
        }
    }
    return fieldsChunk.flat();
}
function prettifyFieldName(fieldName: string) {
    const name = capitalize(fieldName);
    const arrayOfWords = name.match(/[A-Z][a-z]+/g);
    return arrayOfWords ? arrayOfWords.join(' ') : name;
}

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getNestedValue = (object: SettingsType, path: string) => {
    const arrayPath = path.split('.');
    let value = object;
    arrayPath.forEach((prop) => {
        value = value[prop];
    });
    return value;
};
export const setNestedValue = (object: SettingsType, path: string, value: any) => {
    const arrayPath = path.split('.');

    arrayPath.forEach((key, i) => {
        if(i === arrayPath.length - 1) {
            object[key] = Number(value);
            return;
        }
        object[key] = object[key] ? {...object[key]} : {};
        object = object[key];
    })
};
