import { PureComponent } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Product.module.scss';
import Library from '~/components/Library/Library.js';
import { Icons } from '~/components/Image/Images.js';

const cx = className.bind(styles);

class LibraryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={cx('library-list')}>
                {this.props.data &&
                    this.props.data.map((lib) => {
                        return <Library key={lib.id} src={lib.icon} name={lib.name} version={lib.version} />;
                    })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
