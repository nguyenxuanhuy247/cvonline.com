import { Component } from 'react';
import classNames from 'classnames/bind';

import { PngImages } from '~/components/Image/Images.js';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

const items = [
    {
        id: 1,
        src: PngImages.makeCV,
        altText: 'Slide 1',
        caption: 'Slide 1',
    },
    {
        id: 2,
        src: PngImages.findJob,
        altText: 'Slide 2',
        caption: 'Slide 2',
    },
    {
        id: 3,
        src: PngImages.secSafe,
        altText: 'Slide 3',
        caption: 'Slide 3',
    },
];

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.image = items;
    }
    componentDidMount() {
        // let copySlide = document.querySelector(`.${cx('slide')}`).cloneNode(true);
        // document.querySelector(`.${cx('carousel')}`).appendChild(copySlide);
    }

    render() {
        return (
            <div className={cx('carousel')}>
                <div className={cx('slider')}>
                    <div className={cx('img-wrapper')}>
                        <img src={this.image[0].src} alt="" className={cx('image')} />
                        <h3 className={cx('title')}>Công cụ viết CV đẹp Miễn phí</h3>
                        <p className={cx('desc')}>
                            Nhiều mẫu CV đẹp, phù hợp nhu cầu ứng tuyển các vị trí khác nhau. Dễ dàng chỉnh sửa thông
                            tin, tạo CV online nhanh chóng trong vòng 5 phút.
                        </p>
                    </div>
                    <div className={cx('img-wrapper')}>
                        <img src={this.image[0].src} alt="" className={cx('image')} />
                        <h3 className={cx('title')}>Công cụ viết CV đẹp Miễn phí</h3>
                        <p className={cx('desc')}>
                            Nhiều mẫu CV đẹp, phù hợp nhu cầu ứng tuyển các vị trí khác nhau. Dễ dàng chỉnh sửa thông
                            tin, tạo CV online nhanh chóng trong vòng 5 phút.
                        </p>
                    </div>
                    <div className={cx('img-wrapper')}>
                        <img src={this.image[0].src} alt="" className={cx('image')} />
                        <h3 className={cx('title')}>Công cụ viết CV đẹp Miễn phí</h3>
                        <p className={cx('desc')}>
                            Nhiều mẫu CV đẹp, phù hợp nhu cầu ứng tuyển các vị trí khác nhau. Dễ dàng chỉnh sửa thông
                            tin, tạo CV online nhanh chóng trong vòng 5 phút.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;
