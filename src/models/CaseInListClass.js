/**
 * Created by michael on 6/12/2017.
 */
export default function CaseInListClass(caseId,
                                        userId,
                                        categoryId,
                                        caseTitle,
                                        caseDetails,
                                        caseDate,
                                        caseCurrentStatus,
                                        userPictureUrl,
                                        location,
                                        attachments,
                                        likeState,
                                        likesCount,
                                        commentsCount,
                                        timeAgo) {
    this.caseId = caseId || 0;
    this.userId = userId || 'internet';
    this.categoryId = categoryId || 0;
    this.caseTitle = caseTitle || '';
    this.caseDetails = caseDetails || '';
    this.caseDate = caseDate || '';
    this.caseCurrentStatus = caseCurrentStatus || '';
    this.userPictureUrl = userPictureUrl || '';
    this.location = location || new CaseLocation(0, '', '', '');
    this.attachments = attachments || new CaseAttachment(0, '', '', '', 0, 0);
    this.likeState = likeState || '0';
    this.likesCount = likesCount || '0';
    this.commentsCount = commentsCount || '0';
    this.timeAgo = timeAgo || '';
}

export function CaseLocation(locationId, locationLatitude, locationLongitude, locationFormattedAddress) {
    this.locationId = locationId || 0;
    this.locationLatitude = locationLatitude || '';
    this.locationLongitude = locationLongitude || '';
    this.locationFormattedAddress = locationFormattedAddress || '';
}

export function CaseAttachment(attachmentId, attachmentName, attachmentUrl, attachmentUrlThumb, attachmentWidth, attachmentHeight) {
    this.attachmentId = attachmentId || 0;
    this.attachmentName = attachmentName || '';
    this.attachmentUrl = attachmentUrl || '';
    this.attachmentUrlThumb = attachmentUrlThumb || '';
    this.attachmentWidth = attachmentWidth || 0;
    this.attachmentHeight = attachmentHeight || 0;
}