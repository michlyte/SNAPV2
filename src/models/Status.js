/**
 * Created by michael on 6/23/2017.
 */
export function Status(name, id) {
    this.name = name || '';
    this.id = id || 0;
}

export function StatusJson(statusJson) {
    this.name = statusJson.name;
    this.id = statusJson.id;
}