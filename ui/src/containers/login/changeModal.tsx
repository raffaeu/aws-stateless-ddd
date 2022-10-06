import { useState, useEffect } from 'react';

import {
    Modal,
    FormField,
    Input,
    SpaceBetween
} from "@cloudscape-design/components";

interface IProps {
    visible: boolean
};

const ChangePassword = (props: IProps) => {

    const [visible, setVisible] = useState(props.visible);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible]);

    return (
        <Modal
            onDismiss={() => setVisible(false)}
            visible={visible}
            closeAriaLabel="Close modal"
            header="Please provide a new Password"
            size='medium'>
            <SpaceBetween direction="vertical" size="l">
                <FormField
                    label="Your Username"
                    errorText={usernameError.length > 0 ? usernameError : ''}
                >
                    <Input
                        value={username}
                        onChange={({ detail }) => setUsername(detail.value)}
                        autoFocus
                        placeholder="Enter your username" />
                </FormField>
                <FormField
                    errorText={passwordError.length > 0 ? passwordError : ''}
                    label="Your Password">
                    <Input
                        value={password}
                        onChange={({ detail }) => setPassword(detail.value)}
                        type="password"
                        placeholder="Enter your Password" />
                </FormField>
            </SpaceBetween>

        </Modal>
    )
};

export default ChangePassword;