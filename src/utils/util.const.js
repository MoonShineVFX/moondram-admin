import moment from 'moment';
import { faPhotoFilm, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

const utilConst = {
    today: moment().format('YYYY-MM-DD'),
    emptyText: '目前沒有資料...',

    // 側邊攔
    navbar: [
        {
            name: '檔案列表',
            pageKey: '',
        },
        {
            name: '後台帳號',
            pageKey: 'admin_account',
        },
    ],

    toggleConfig: {
        all: {
            label: '全部',
            icon: faPhotoFilm,
        },
        image: {
            label: '圖片',
            icon: faImage,
        },
        video: {
            label: '影片',
            icon: faVideo,
        },
    },

    // Error mesg
    errorMesg: {
        error_required: '此欄位為必填',
        error_pattern: '格式有誤',
    },
};

export default utilConst;
