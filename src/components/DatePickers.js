import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

// 語系設定
const locale = {
    lang: {
        locale: 'zh-tw',
        yearFormat: 'YYYY 年',
        monthFormat: 'MM 月',
        ok: '確定',
    }
};

//
const DatePickers = ({ mode, onChange, ...rest }) => (

    <DatePicker
        placeholder="選取月份"
        picker={mode}
        onChange={onChange}
        locale={locale}
        {...rest}
    />

);

//
const RangePickers = ({ mode, onChange, ...rest }) => {

    const str = '時間';
    const placeholder = [`開始${str}`, `結束${str}`];

    return (

        <RangePicker
            placeholder={placeholder}
            picker={mode}
            ranges={{
                '今天': [moment(), moment()],
                '這個月': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
            allowEmpty={[true, true]}
            locale={locale}
            {...rest}
        />

    );

};

DatePickers.defaultProps = {
    mode: 'month',
};

DatePickers.propTypes = {
    mode: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

RangePickers.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export {
    DatePickers as default,
    RangePickers,
};
