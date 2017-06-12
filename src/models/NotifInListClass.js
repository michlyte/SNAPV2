/**
 * Created by michael on 6/12/2017.
 */
export default function NotifInList(notificationId, body, caseTitle, caseId, friendPictureUrl, attachmentUrlThumb, notificationDate) {
    this.notificationId = notificationId || 0;
    this.body = body || '';
    this.caseTitle = caseTitle || '';
    this.caseId = caseId || 0;
    this.friendPictureUrl = friendPictureUrl || '';
    this.attachmentUrlThumb = attachmentUrlThumb || '';
    this.notificationDate = notificationDate || 0;
};