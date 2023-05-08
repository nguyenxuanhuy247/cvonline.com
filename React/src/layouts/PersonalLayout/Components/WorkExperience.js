import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './WorkExperience.module.scss';
import * as userCVActions from '~/store/actions';

const cx = className.bind(styles);

class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: this.props.companyName,
            jobPosition: this.props.jobPosition,
            productDesc: this.props.productDesc,
        };

        this.companyName = React.createRef();
        this.jobPosition = React.createRef();
        this.productDesc = React.createRef();
    }

    handleChangeContent = (e) => {
        this.setState({ company: e.target.innerText });
    };

    componentWillUnmount() {
        this.props.changeCompanyName(this.state.companyName);
        this.props.changeJobPosition(this.state.jobPosition);
        this.props.changeProductDescription(this.state.productDesc);
    }

    render = () => {
        return (
            <div className={cx('work-exp-desc')} spellCheck="false">
                <div className={cx('work-exp')}>
                    <p
                        className={cx('company-name')}
                        onInput={(e) => this.handleChangeNameCompany(e)}
                        ref={this.companyName}
                        dangerouslySetInnerHTML={{ __html: this.props.companyName }}
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Tên công ty"
                        spellCheck="false"
                    ></p>
                    <span className={cx('dash')}>-</span>
                    <p
                        className={cx('job-position')}
                        ref={this.myRef}
                        dangerouslySetInnerHTML={{ __html: this.props.jobPosition }}
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Vị trí công việc"
                        spellCheck="false"
                    ></p>
                </div>

                <div className={cx('desc')}>
                    <p
                        className={cx('product-desc')}
                        ref={this.jobPosition}
                        dangerouslySetInnerHTML={{ __html: this.props.productDesc }}
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Mô tả ngắn gọn về sản phẩm"
                        spellCheck="false"
                    ></p>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        companyName: state.userCV.companyName,
        jobPosition: state.userCV.jobPosition,
        productDesc: state.userCV.productDesc,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCompanyName: (data) => dispatch(userCVActions.userChangeCompanyName(data)),
        changeJobPosition: (data) => dispatch(userCVActions.userChangeJobPosition(data)),
        changeProductDescription: (data) => dispatch(userCVActions.userChangeProductDescription(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
