// react
import { useState } from "react";

// redux
import { Credentials } from "../../store/auth/types";
import { authenticateUser } from "../../store/auth/actions";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";

// cloudscape
import {
    Header,
    Form,
    SpaceBetween,
    Button,
    Container,
    FormField,
    Input,
    Alert
} from "@cloudscape-design/components";
import ChangePassword from "./changeModal";

// style
import './login.scss';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const state = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const onCancelClick = () => {
        setUsername('');
        setPassword('');
        //clean
        setUsernameError('');
        setPasswordError('');
    }

    const onSubmitClick = () => {
        // validation
        if (username.length < 1) {
            setUsernameError('The Username is a mandatory field');
            return;
        }
        if (password.length < 1) {
            setPasswordError('The Password is a mandatory field');
            return;
        }
        //clean
        setUsernameError('');
        setPasswordError('');
        // authenticate
        let credentials: Credentials = { username: username, password: password };
        dispatch(authenticateUser(credentials));
    }

    return (
        <div className="login">
            <div className="loginLeft">
                <SpaceBetween direction="vertical" size="l">
                    <form onSubmit={e => e.preventDefault()}>
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button formAction="none" variant="normal" onClick={onCancelClick}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={onSubmitClick} loading={state.status === 'loading'}>
                                        Login
                                    </Button>
                                </SpaceBetween>
                            }
                            header={
                                <Header
                                    variant="h1"
                                    description="Provide your Username and Password in order to access the system"
                                >
                                    <div className="header"></div>
                                    Portal Login
                                </Header>
                            }
                        >
                            <Container
                                header={
                                    <Header variant="h2">
                                        Credentials
                                    </Header>
                                }
                            >
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
                            </Container>
                        </Form>
                    </form>

                    <Alert
                        visible={state.status === 'failed'}
                        type="error"
                        header={state.error.errorTitle}
                    >
                        {state.error.errorMessage}
                    </Alert>
                    <ChangePassword visible={state.status === 'failed'} />
                </SpaceBetween>
            </div>

        </div>
    )
}

export default Login;