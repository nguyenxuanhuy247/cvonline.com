import React, { PureComponent } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import './Carousel.scss';
import { PngImages } from '~/components/Image/Images.js';

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

class Carousel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isDragging: false, isAutoPlay: true, startX: null, startScrollLeft: null, timeoutId: null };
    }

    componentDidMount() {
        const wrapper = document.querySelector('.wrapper');
        const carousel = document.querySelector('.carousel');
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
        const arrowBtns = document.querySelectorAll('.wrapper i');
        const carouselChildrens = [...carousel.children];

        let isDragging = false,
            isAutoPlay = true,
            startX,
            startScrollLeft,
            timeoutId;

        // Get the number of cards that can fit in the carousel at once
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        // Insert copies of the last few cards to beginning of carousel for infinite scrolling
        carouselChildrens
            .slice(-cardPerView)
            .reverse()
            .forEach((card) => {
                carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
            });

        // Insert copies of the first few cards to end of carousel for infinite scrolling
        carouselChildrens.slice(0, cardPerView).forEach((card) => {
            carousel.insertAdjacentHTML('beforeend', card.outerHTML);
        });

        // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');

        // Add event listeners for the arrow buttons to scroll the carousel left and right
        arrowBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
            });
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add('dragging');
            // Records the initial cursor and scroll position of the carousel
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        };

        const dragging = (e) => {
            if (!isDragging) return; // if isDragging is false return from here
            // Updates the scroll position of the carousel based on the cursor movement
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        };

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove('dragging');
        };

        const infiniteScroll = () => {
            // If the carousel is at the beginning, scroll to the end
            if (carousel.scrollLeft === 0) {
                carousel.classList.add('no-transition');
                carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
                carousel.classList.remove('no-transition');
            }
            // If the carousel is at the end, scroll to the beginning
            else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add('no-transition');
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove('no-transition');
            }

            // Clear existing timeout & start autoplay if mouse is not hovering over carousel
            clearTimeout(timeoutId);
            if (!wrapper.matches(':hover')) autoPlay();
        };

        const autoPlay = () => {
            if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
            // Autoplay the carousel after every 2500 ms
            timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
        };

        autoPlay();

        carousel.addEventListener('mousedown', dragStart);
        carousel.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragStop);
        carousel.addEventListener('scroll', infiniteScroll);
        wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
        wrapper.addEventListener('mouseleave', autoPlay);
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <i id="left" className="button">
                        <BsChevronLeft />
                    </i>
                    <ul className="carousel">
                        <li className="card">
                            <div className="img-wrapper">
                                <img src={items[0].src} className="img" alt="img" draggable="false" />
                            </div>
                            <h3 className="heading">Công cụ viết CV đẹp miễn phí</h3>
                        </li>
                        <li className="card">
                            <div className="img-wrapper">
                                <img src={items[1].src} className="img" alt="img" draggable="false" />
                            </div>
                            <h3 className="heading">Bảo mật & An toàn tuyệt đối</h3>
                        </li>
                        <li className="card">
                            <div className="img-wrapper">
                                <img src={items[2].src} className="img" alt="img" draggable="false" />
                            </div>
                            <h3 className="heading">Hỗ trợ người tìm việc</h3>
                        </li>
                    </ul>
                    <i id="right" className="button">
                        <BsChevronRight />
                    </i>
                </div>
            </div>
        );
    }
}

export default Carousel;
