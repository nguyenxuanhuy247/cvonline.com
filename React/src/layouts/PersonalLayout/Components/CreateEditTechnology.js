import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './CreateEditTechnology.module.scss';
import Button from '~/components/Button/Button.js';
import Image from '~/components/Image/Image.js';
import Loading from '~/components/Modal/Loading.js';
import ChangeImageModal from '~/components/Modal/ChangeImageModal.js';

const cx = classnames.bind(styles);

class CreateEditTechnology extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props?.data?.id || undefined,
            image: this.props?.data?.image || '',
            name: this.props?.data?.name || '',
            version: this.props?.data?.version || '',
            link: this.props?.data?.link || '',
        };
    }

    handleGetImageUrlFromChangeImageModal = async (url) => {
        await this.setState({ image: url });
    };

    handleCloseChangeImageModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    handleInputTechnology = (e, name) => {
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleCreateOrUpdateTechnology = async (bool) => {
        if (bool) {
            await this.props.onupdate(this.state, this.props.onclose);
        } else {
            await this.props.oncreate(this.state);
        }
    };

    render() {
        const { id, isedit, className, isloading, technology, onclose } = this.props;

        return (
            <div className={cx('create-edit-technology', className)} id={id}>
                <div className={cx('info')}>
                    <p className={cx('heading')}>{isedit ? `Chỉnh sửa ${technology}` : `Thêm ${technology} mới`}</p>
                    <div className={cx('image-wrapper')}>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -50]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Button
                                        className={cx('add-edit-image-button')}
                                        onClick={() => this.setState({ isModalOpen: true })}
                                    >
                                        {`${isedit ? `Sửa ảnh` : `Thêm ảnh`}`}
                                    </Button>
                                </div>
                            )}
                        >
                            <Image className={cx('image')} src={this.state.image} round />
                        </HeadlessTippy>
                        {this.state.isModalOpen && (
                            <ChangeImageModal
                                round
                                onClose={this.handleCloseChangeImageModal}
                                onGetUrl={this.handleGetImageUrlFromChangeImageModal}
                            />
                        )}
                    </div>
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder={`Nhập tên ${technology}`}
                        value={this.state.name}
                        onChange={(e) => this.handleInputTechnology(e, 'name')}
                    />
                    <input
                        hidden={technology !== 'thư viện'}
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập version"
                        value={this.state.version}
                        onChange={(e) => this.handleInputTechnology(e, 'version')}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập link website (nếu có)"
                        value={this.state.link}
                        onChange={(e) => this.handleInputTechnology(e, 'link')}
                    />
                </div>
                <div className={cx('actions')}>
                    <Button className={cx('btn', 'cancel')} onClick={onclose}>
                        Hủy
                    </Button>
                    <Button
                        className={cx('btn', 'add')}
                        onClick={() => this.handleCreateOrUpdateTechnology(isedit)}
                    >{`${isedit ? `Cập nhật` : `Thêm`}`}</Button>
                </div>

                {isloading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default CreateEditTechnology;
