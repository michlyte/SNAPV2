/**
 * Created by michael on 6/16/2017.
 */
import CaseInListClass, {CaseAttachment, CaseLocation} from "../models/CaseInListClass";
import NotifInListClass from "../models/NotifInListClass";
import {DataType} from "../utils/EnumHelper";

export const ecqDummyListCase = (startIndex, numberOfItemPerPage, dataType) => {
    let newData = [];
    for (let i = startIndex; i < startIndex + numberOfItemPerPage; i++) {
        newData.push(
            new CaseInListClass(
                i,
                'internet',
                0,
                dataType + ' ' + i,
                'Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004 hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.',
                '17-May-2016 15:55:04',
                'Logged',
                'https://facebook.github.io/react/img/logo_og.png',
                new CaseLocation(
                    354,
                    '4.202654637500015',
                    '16.068396717309952',
                    'RN 10, Central African Republic'),
                new CaseAttachment(
                    5533,
                    'CASE_20160512_040648-158261009.jpg',
                    'https://facebook.github.io/react/img/logo_og.png',
                    dataType === DataType.AllCases ? 'https://facebook.github.io/react/img/logo_og.png' : 'https://image.freepik.com/free-photo/big-red-roses-picture-material_38-5932.jpg',
                    100,
                    100),
                '0',
                '0',
                '0',
                ''
            )
        );
    }
    return newData;
};

export const ecqDummyListNotif = (startIndex, numberOfItemPerPage) => {
    let newData = [];
    for (let i = startIndex; i < startIndex + numberOfItemPerPage; i++) {
        newData.push(
            new NotifInListClass(
                i,
                i + ' egp_ecquaria commented on your case : test title.',
                'test title',
                i,
                'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                '1460483504000'
            )
        );
    }
    return newData;
};