/**
 * Created by michael on 6/12/2017.
 */
export default function NotificationClass(id, title, value) {
    this.id = id || 0;
    this.title = title || '';
    this.value = value || true;
}