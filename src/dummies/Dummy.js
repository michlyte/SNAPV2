/**
 * Created by michael on 6/16/2017.
 */
import Constants from "../Constants";
import CaseInListClass, {CaseAttachment, CaseLocation} from "../models/CaseInListClass";
import {DataType} from "../utils/EnumHelper";

export const ecqDummyListInit = (startIndex, dataType) => {
    let newData = [];
    for (let i = startIndex; i < startIndex + Constants.numberOfItemPerPage; i++) {
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
                new CaseLocation(354, '4.202654637500015', '16.068396717309952', 'RN 10, Central African Republic'),
                new CaseAttachment(5533, 'CASE_20160512_040648-158261009.jpg', 'https://facebook.github.io/react/img/logo_og.png', 'https://facebook.github.io/react/img/logo_og.png', 100, 100),
                '0',
                '0',
                '0',
                ''
            )
        );
    }
    return (newData);
};