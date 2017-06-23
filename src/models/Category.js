/**
 * Created by michael on 6/23/2017.
 */
export function Category(name, id) {
    this.name = name || '';
    this.id = id || 0;
}

export function CategoryJson(categoryJson) {
    this.name = categoryJson.name;
    this.id = categoryJson.id;
}