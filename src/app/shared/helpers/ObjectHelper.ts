/**Classe che mette a disposizione metodi di utility da applicare ad un oggetto */
export class ObjectHelper {

    /**
     * Method running a deep copy of the specified object. 
     * @param {*} param 
     * @returns 
     */
    static getCopy(param: any) {
        return JSON.parse(JSON.stringify(param));
    }

    /**
     * Method getting the number of fields included in a object.
     * @param {*} obj 
     */
    static objectFieldsNumber(obj: {} | null) {
        let length = 0;
        if (obj != null) {
            length = Object.keys(obj).length;
        }
        return length;
    }

    /**
     * Method getting the key of the specified
     * value in the specified object array.
     * This method will return the key of the first 
     * occurance of the value found in the array.
     * @param data object array containig the value of which getting the field name.
     * @param element value of which getting the field name.
     */
    static getValueKey(data: object[], element: object) {
        const keys = Object.keys(data);

        for (let index = 0; index < keys.length; index++) {
            const key: any = keys[index];
            const el = data[key];
            const elAsStr = JSON.stringify(el);
            const elementAsStr = JSON.stringify(element);
            if (elAsStr === elementAsStr) {
                return key;
            }
        }

        return null;
      }
}
