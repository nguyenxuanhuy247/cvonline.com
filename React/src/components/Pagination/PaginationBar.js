import { PureComponent } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './Pagination.scss';

class PaginationBar extends PureComponent {
    render() {
        return (
            <Pagination className="pag">
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        Prev
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        5
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className="pag-item">
                    <PaginationLink href="#" className="pag-link">
                        Next
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}

export default PaginationBar;
