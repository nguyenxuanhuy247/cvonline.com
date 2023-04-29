import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './ModalAddUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            titleId: '',
            gender: '',
            phoneNumber: '',
            address: '',
        };
    }

    handToggleModal = () => {
        this.props.isToggle();
    };

    render = () => {
        return (
            <div>
                <Modal isOpen={this.props.isOpenModal} centered toggle={() => this.handToggleModal()} className="modal">
                    <ModalHeader toggle={() => this.handToggleModal()}>Add a new user</ModalHeader>

                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={this.state.email}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="firstName">First name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={this.state.firstName}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastName">Last name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={this.state.lastName}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" name="title" type="select">
                                    <option value="0">---Choose---</option>
                                    <option value="1">Director</option>
                                    <option value="2">Saleman</option>
                                    <option value="3">Accountant</option>
                                    <option value="4">Sale assistant</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="gender">Select</Label>
                                <Input id="gender" name="gender" type="select">
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="phoneNumber">Phone number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"
                                    type="phone"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input id="address" name="address" placeholder="Enter your address" type="text" />
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handToggleModal()}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.handToggleModal()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
}

export default ModalAddUser;
